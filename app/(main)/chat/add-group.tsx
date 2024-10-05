import JoinChannel from "@/components/chat/JoinChannel";
import { UserItem } from "@/components/chat/UserItem";
import socket from "@/constants/socket";
import { selectPublicChannel, useAppStore } from "@/store";
import { Channel } from "@/type/chat";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  FlatList,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { z } from "zod";
import debounce from "lodash/debounce";

export default function AddGroupScreen() {
  const [groupName, setGroupName] = useState("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPublicChannel = async () => {
    const res = await socket.emitWithAck("channel:search", {
      q: groupName,
    });
    setChannels(res.data);
  };

  const debouncedFetchPublicChannel = debounce(fetchPublicChannel, 300);

  useEffect(() => {
    debouncedFetchPublicChannel();
  }, [groupName]);

  const isGroupNameValid = z
    .string()
    .min(1)
    .max(30)
    .safeParse(groupName).success;

  const onCreateGroup = async () => {
    if (!isGroupNameValid) return;

    try {
      setIsLoading(true);
      await socket.emitWithAck("channel:create", {
        name: groupName,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setGroupName("");
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={groupName}
          onChangeText={(text) => setGroupName(text)}
          placeholder="Group Name"
        />
        <Button
          mode="contained"
          disabled={!isGroupNameValid}
          onPress={onCreateGroup}
          loading={isLoading}
        >
          Create
        </Button>
      </View>

      <View style={styles.container}>
        <FlatList
          data={channels}
          renderItem={({ item }) => <JoinChannel channel={item} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  channelItem: {
    // padding: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});
