import { Pressable, StyleSheet, View } from "react-native";
import { Channel, ChannelType } from "@/type/chat";
import socket from "@/constants/socket";
import { useEffect } from "react";
import { Link, router } from "expo-router";
import { Badge, Text } from "react-native-paper";
import { useAppStore, useGetUserByIdAppStore } from "@/store";

export const UserItem = ({ channel }: { channel: Channel }) => {
  const user = useGetUserByIdAppStore(channel?.users?.at(0));
  const { setListUser, listUser } = useAppStore();

  const handleFetchUsers = async () => {
    if (channel?.type === ChannelType.PUBLIC || !socket.connected) {
      return;
    }

    try {
      const res = await socket.emitWithAck("user:get", {
        userId: channel?.users?.at(0),
      });

      console.log("user:get", res);

      const user = listUser.get(res?.data?.id);
      if (user) {
        listUser.set(res?.data?.id, {
          ...user,
          ...res?.data,
        });
      } else {
        listUser.set(res?.data?.id, res?.data);
      }

      setListUser(listUser);
    } catch (error) {
      console.error("Error during socket emitWithAck:", error);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Link
        // onPress={() =>
        //   router.push({
        //     pathname: `/chat/${channel?.id}`,
        //     params: {
        //       channelId: channel?.id,
        //     },
        //   })
        // }
        href={`/(tabs)/(index)/${channel?.id}`}
        style={styles.button}
      >
        <View style={styles.hash}>
          <Text>{channel?.type === ChannelType.PUBLIC ? "#" : "@"}</Text>
          {channel?.type === ChannelType.PRIVATE && (
            <View
              style={[
                styles.dot,
                { backgroundColor: user?.isOnline ? "green" : "red" },
              ]}
            />
          )}
        </View>
        <Text variant="labelLarge" style={styles.label}>
          {channel?.type === ChannelType.PRIVATE
            ? user?.username
            : channel?.name}
        </Text>
        {Number(channel?.unreadCount) > 0 && (
          <Badge>{channel?.unreadCount}</Badge>
        )}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: "#000",
  },
  hash: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "#eee",
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    color: "#000",
    fontSize: 40,
    padding: 0,
    margin: 0,
    backgroundColor: "red",
    borderRadius: 10,
    lineHeight: 0,
    position: "absolute",
    width: 8,
    height: 8,
    right: 0,
    bottom: 0,
  },
});
