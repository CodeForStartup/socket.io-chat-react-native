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
} from "react-native";

import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import socket from "@/constants/socket";
import { UserItem } from "@/components/chat/UserItem";
import { Channel } from "@/type/chat";
import { useAppStore } from "@/store";

export default function HomeScreen() {
  const setListChannel = useAppStore((state) => state.setListChannel);

  const handleGetListChannel = async () => {
    if (!socket.connected) {
      console.log("Socket is not connected.");
      return;
    } else {
      console.log("Socket is connected.");
    }

    try {
      const res = await socket.emitWithAck("channel:list", {
        size: 100,
      });

      console.log("channel: ", res?.data);

      setListChannel(res?.data);
    } catch (error) {
      console.error("Error during socket emitWithAck:", error);
    }
  };

  useEffect(() => {
    handleGetListChannel();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <TextInput placeholder="Search" />
      </View>
      <FlatList
        style={{ padding: 16 }}
        data={useAppStore((state) => state.listChannel)}
        renderItem={({ item }) => <UserItem channel={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
