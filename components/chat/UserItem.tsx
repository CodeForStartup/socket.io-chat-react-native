import { Pressable, Touchable, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Channel, ChannelType } from "@/type/chat";
import socket from "@/constants/socket";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store";
import { router } from "expo-router";

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
    <View
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
      }}
    >
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(chat)/chat",
            params: {
              channelId: channel?.id,
            },
          })
        }
      >
        <ThemedText style={{ fontSize: 16, fontWeight: "500" }}>
          {userName}
        </ThemedText>
      </Pressable>
    </View>
  );
};
