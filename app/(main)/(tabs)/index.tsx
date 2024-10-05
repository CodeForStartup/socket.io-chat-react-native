import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  SafeAreaView,
  View,
  Pressable,
  LogBox,
  FlatList,
  SectionList,
} from "react-native";
import { Text } from "react-native-paper";

import { Link, useFocusEffect } from "expo-router";
import socket from "@/constants/socket";
import { UserItem } from "@/components/chat/UserItem";
import { ChannelType } from "@/type/chat";
import { selectListChannel, useAppStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const setListChannel = useAppStore((state) => state.setListChannel);
  const listChannel = useAppStore(selectListChannel);

  const channelSection = [
    {
      key: "Groups",
      title: "Groups",
      data: listChannel.filter(
        (channel) => channel.type === ChannelType.PUBLIC
      ),
    },
    {
      key: "Friends",
      title: "Friends",
      data: listChannel.filter(
        (channel) => channel.type === ChannelType.PRIVATE
      ),
    },
  ];

  const handleGetListChannel = async () => {
    if (!socket.connected) {
      return;
    }

    try {
      const res = await socket.emitWithAck("channel:list", {
        size: 100,
      });

      setListChannel(res?.data);
    } catch (error) {
      console.error("Error during socket emitWithAck:", error);
    }
  };

  useFocusEffect(() => {
    handleGetListChannel();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          padding: 16,
          // backgroundColor: "red",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Text variant="headlineLarge" style={{ fontWeight: "700" }}>
          Socket.io{" "}
          <Text style={{ fontWeight: "700", color: "tomato" }}>Chat</Text>
        </Text>
      </View>
      <SectionList
        sections={channelSection}
        renderItem={({ item }) => <UserItem channel={item} />}
        renderSectionHeader={({ section }) => (
          <View
            style={{
              paddingHorizontal: 16,
              backgroundColor: "#eee",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
            }}
          >
            <Text variant="labelLarge">{section.title}</Text>
            <Link
              href={
                section.key === "Groups"
                  ? "/chat/add-group"
                  : "/chat/add-friend"
              }
              style={{ padding: 12 }}
            >
              <Ionicons
                name={section.key === "Groups" ? "people" : "person-add"}
                size={16}
                color="black"
              />
            </Link>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
