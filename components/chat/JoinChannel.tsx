import { Pressable, StyleSheet, View } from "react-native";
import { Channel, ChannelType } from "@/type/chat";
import { Text, Button } from "react-native-paper";
import socket from "@/constants/socket";
import { useState } from "react";

export default function JoinChannel({ channel }: { channel: Channel }) {
  const [loading, setLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  const onJoin = async () => {
    try {
      setLoading(true);
      await socket.emitWithAck("channel:join", {
        channelId: channel.id,
      });
      setIsJoined(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.hash}>
          <Text>{channel?.type === ChannelType.PUBLIC ? "#" : "@"}</Text>
        </View>
        <Text variant="labelLarge" style={styles.label}>
          {channel?.name}
        </Text>
      </View>
      <View>
        <Button
          mode="text"
          onPress={onJoin}
          loading={loading}
          disabled={isJoined}
        >
          {isJoined ? "JOINED" : "JOIN"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderColor: "#e0e0e0",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: "100%",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
