import { Pressable, Touchable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Channel, ChannelType } from "@/type/chat";
import socket from "@/constants/socket";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { router } from "expo-router";

export const UserItem = ({ channel }: { channel: Channel }) => {
  const { setCurrentUser, listUser } = useAppStore();
  const [userName, setUserName] = useState<string>(channel?.name || "");

  const handleGetListChannel = async () => {
    if (channel?.type === ChannelType.PUBLIC) return;

    if (!socket.connected) {
      console.log("Socket is not connected.");
      return;
    } else {
      console.log("Socket is connected.");
    }

    try {
      const res = await socket.emitWithAck("user:get", {
        userId: channel?.users?.at(0),
      });
      console.log("user: ", { channel, res });

      setUserName(res?.data?.username);
    } catch (error) {
      console.error("Error during socket emitWithAck:", error);
    }
  };

  useEffect(() => {
    handleGetListChannel();
  }, []);

  return (
    <View
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <Pressable onPress={() => router.navigate("/(chat)/chat")}>
        <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>
          {userName}
        </ThemedText>
      </Pressable>
    </View>
  );
};
