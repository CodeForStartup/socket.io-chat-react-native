import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useEffect, useState } from "react";
import socket from "@/constants/socket";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/auth";
import { ChannelType, Message } from "@/type/chat";
import { useAppStore } from "@/store";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen() {
  const { channelId } = useLocalSearchParams();
  const { user } = useAuth();
  const listChannel = useAppStore((state) => state.listChannel);
  const listUser = useAppStore((state) => state.listUser);

  const currentChannel = listChannel.find(
    (channel) => channel.id === channelId
  );
  const [messages, setMessages] = useState(
    (currentChannel?.messages || []).map((message) => ({
      _id: message.id,
      text: message.content,
      createdAt: new Date(),
      user: {
        _id: message.from,
        name: "user",
      },
    }))
  );

  const [title, setTitle] = useState(
    currentChannel?.type === ChannelType.PUBLIC
      ? currentChannel?.name
      : currentChannel?.users
          .map((user) => listUser.get(user)?.username)
          .join(", ")
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

    await socket.emitWithAck("message:ack", {
      channelId,
      messageId: res.data?.at(0)?.id,
    });

    const newChannel = listChannel.find((channel) => channel.id === channelId);
    if (newChannel) {
      newChannel.messages = res.data;
      newChannel.isLoaded = true;
      newChannel.unreadCount = 0;
      useAppStore.setState({ listChannel: [...listChannel] });
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const onSend = async (newMessage: IMessage[]) => {
    try {
      const res = await socket.emitWithAck("message:send", {
        channelId: channelId,
        content: newMessage[0].text,
      });

      setMessages((prev) => [
        ...prev,
        {
          _id: res?.data?.id,
          text: newMessage[0].text,
          createdAt: new Date(),
          user: {
            _id: String(user?.id),
            name: "user",
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.headerTitle}>
              <View style={styles.userIcons}>
                <Ionicons
                  name={
                    currentChannel?.type === ChannelType.PUBLIC
                      ? "people"
                      : "person"
                  }
                  size={16}
                  color="black"
                />
              </View>
              <Text style={styles.headerTitleText}>{title}</Text>
            </View>
          ),
        }}
      />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(mgs: IMessage[]) => onSend(mgs)}
          user={{
            _id: String(user?.id),
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userIcons: {
    width: 24,
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#eee",
  },
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
