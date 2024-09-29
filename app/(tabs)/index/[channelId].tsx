import { StyleSheet } from "react-native";

import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import socket from "@/constants/socket";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/auth";
import { Message } from "@/type/chat";
import { useAppStore } from "@/store";

export default function ChatScreen() {
  const { channelId } = useLocalSearchParams();
  const { user } = useAuth();
  const listChannel = useAppStore((state) => state.listChannel);

  const currentChannel = listChannel.find(
    (channel) => channel.id === channelId
  );

  const loadMessages = async () => {
    if (!channelId) return;

    const query = {
      size: 100,
      channelId,
      orderBy: "id:desc",
    };

    const res = await socket.emitWithAck("message:list", query);

    if (res.status !== "OK") {
      return;
    }

    // const listMessages = res.data.map((message: Message) => ({
    //   _id: message.id,
    //   text: message.content,
    //   user: {
    //     _id: message.from,
    //     name: "user", // TODO: get user name from backend
    //   },
    // }));

    await socket.emitWithAck("message:ack", {
      channelId,
      messageId: res.data.at(0)?._id,
    });

    const newChannel = listChannel.find((channel) => channel.id === channelId);
    if (newChannel) {
      newChannel.messages = res.data;
      newChannel.isLoaded = true;
      newChannel.unreadCount = 0;
      useAppStore.setState({ listChannel: [...listChannel] });
    }
  };

  const ackMessage = async (messageId: string) => {
    // useAppStore.setState({ listChannel: [...listChannel] });
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const onSend = async (messages: IMessage[]) => {
    try {
      await socket.emitWithAck("message:send", {
        channelId: channelId,
        content: messages[0].text,
      });

      // setMessages((prev) => [...prev, messages[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: add typing indicator
  // TODO: add message read/unread status
  return (
    <GiftedChat
      messages={(currentChannel?.messages || []).map((message) => ({
        _id: message.id,
        text: message.content,
        createdAt: new Date(),
        user: {
          _id: message.from,
          name: "user",
        },
      }))}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.id!,
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: "red",
    borderRadius: 16,
    textAlign: "center",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonTitle: {
    color: "white",
  },
});
