import { useEffect } from "react";
import socket from "@/constants/socket";
import { useAppStore } from "@/store";
import { Channel, Message, User } from "@/type/chat";

function insertAtRightOffset(messages: Message[], message: Message): Message[] {
  // note: this won't work with id bigger than Number.MAX_SAFE_INTEGER
  message.mid = message.id ? parseInt(message.id, 10) : Infinity;

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id === message.id) {
      return messages;
    }
    if (messages[i]?.mid && messages[i]?.mid > message.mid) {
      messages.splice(i, 0, message);
      return messages;
    }
  }

  messages.push(message);

  return messages;
}

// bind message to channel
// if channel is received a new message:
// - insert message to channel
// - update unread count
// - update isLoaded to true
export default function useBindMessages() {
  const { listChannel, listUser, setListUser, setListChannel } = useAppStore();

  useEffect(() => {
    socket.on("message:sent", (message: Message) => {
      console.log("message:sent", message);

      const currentChannel = listChannel.find(
        (channel) => channel.id === message.channelId
      );

      if (currentChannel) {
        const newMessages = insertAtRightOffset(
          currentChannel.messages || [],
          message
        );

        const newListChannel = [...listChannel];
        const index = newListChannel.findIndex(
          (channel) => channel.id === currentChannel.id
        );
        newListChannel[index] = {
          ...currentChannel,
          messages: newMessages,
          unreadCount: currentChannel.unreadCount
            ? currentChannel.unreadCount + 1
            : 1,
          isLoaded: true,
        };
        setListChannel(newListChannel);
      }
    });

    socket.on("user:connected", (userId: string) => {
      const newListUser = [...listUser];
      const index = newListUser.findIndex((u) => u.id === userId);
      if (index !== -1) {
        console.log("user:connected", newListUser[index]);
        newListUser[index] = {
          ...newListUser[index],
          isOnline: true,
        };
      }
      setListUser(newListUser);
    });

    socket.on("user:disconnected", (user: User) => {
      console.log("user:disconnected", user);
      const newListUser = [...listUser];
      const index = newListUser.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        newListUser[index] = {
          ...newListUser[index],
          isOnline: false,
        };
      }
      setListUser(newListUser);
    });
  }, [listChannel, listUser, setListChannel, setListUser]);
}
