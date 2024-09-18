import { StyleSheet } from "react-native";

import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import socket from "@/constants/socket";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/auth";
import { Message } from "@/type/chat";

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { channelId } = useLocalSearchParams();
  const { user } = useAuth();

  const loadMessages = async () => {
    if (!channelId) return;

    const query = {
      size: 20,
      channelId,
      orderBy: "id:asc",
    };

    const res = await socket.emitWithAck("message:list", query);

    if (res.status !== "OK") {
      return;
    }

    //
    const newMessages = res.data.map((message: Message) => ({
      _id: message.id,
      text: message.content,
      user: {
        _id: message.from,
        name: "user", // TODO: get user name from backend
      },
    }));

    setMessages(newMessages);
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

      setMessages((prev) => [...prev, messages[0]]);
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: add typing indicator
  // TODO: add message read/unread status
  return (
    <GiftedChat
      messages={messages.reverse()}
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
