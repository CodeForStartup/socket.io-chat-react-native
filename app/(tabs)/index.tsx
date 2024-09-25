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
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const setListChannel = useAppStore((state) => state.setListChannel);
  const listChannel = useAppStore((state) => state.listChannel);

  console.log("::listChannel", listChannel);

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

  const handleAddFriend = async () => {
    router.push("/add-friend");
  };

  useEffect(() => {
    handleGetListChannel();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          padding: 16,
          // backgroundColor: "red",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Ionicons name="search" size={20} color="black" />
        <TextInput placeholder="Search" style={{ flex: 1 }} />
        <Pressable onPress={handleAddFriend} style={{ padding: 8 }}>
          <Ionicons name="person-add" size={20} color="black" />
        </Pressable>
      </View>
      <FlatList
        // style={{ paddingTop: 16 }}
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
