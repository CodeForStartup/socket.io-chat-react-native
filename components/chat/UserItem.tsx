import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Channel } from "@/type/chat";
import socket from "@/constants/socket";
import { useEffect } from "react";
import { useAppStore } from "@/store";

export const UserItem = ({ channel }: { channel: Channel }) => {
  // const { setCurrentUser } = useAppStore();

  // const handleGetListChannel = async () => {
  //   if (!socket.connected) {
  //     console.log("Socket is not connected.");
  //     return;
  //   } else {
  //     console.log("Socket is connected.");
  //   }

  //   try {
  //     const res = await socket.emitWithAck("channel:list", {
  //       size: 100,
  //     });
  //     setListChannel(res?.data);
  //   } catch (error) {
  //     console.error("Error during socket emitWithAck:", error);
  //   }
  // };

  useEffect(() => {
    // handleGetListChannel();
  }, []);

  return (
    <View>
      <ThemedText>User</ThemedText>
    </View>
  );
};
