import { Pressable, StyleSheet, View } from "react-native";
import { Channel, ChannelType } from "@/type/chat";
import socket from "@/constants/socket";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Badge, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export const UserItem = ({ channel }: { channel: Channel }) => {
  const [userName, setUserName] = useState<string>(channel?.name || "");

  const handleGetListChannel = async () => {
    if (channel?.type === ChannelType.PUBLIC || !socket.connected) {
      return;
    }

    try {
      const res = await socket.emitWithAck("user:get", {
        userId: channel?.users?.at(0),
      });

      setUserName(res?.data?.username);
    } catch (error) {
      console.error("Error during socket emitWithAck:", error);
    }
  };

  useEffect(() => {
    handleGetListChannel();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(chat)/chat",
            params: {
              channelId: channel?.id,
            },
          })
        }
        style={styles.button}
      >
        <Text style={styles.hash}>#</Text>
        <Text variant="labelLarge" style={styles.label}>
          {userName}
        </Text>
        <Badge>3</Badge>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#000",
  },
  hash: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
