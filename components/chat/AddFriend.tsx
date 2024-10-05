import { StyleSheet, View } from "react-native";
import { Channel, ChannelType } from "@/type/chat";
import { Text, Button } from "react-native-paper";
import socket from "@/constants/socket";
import { useState } from "react";

export interface FriendType {
  id: string;
  username: string;
}

export default function AddFriend({ id, username }: FriendType) {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addFriend = async () => {
    try {
      setLoading(true);
      await socket.emitWithAck("user:reach", {
        userIds: [id],
      });
      setIsAdded(true);
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
          <Text>@</Text>
        </View>
        <Text variant="labelLarge" style={styles.label}>
          {username}
        </Text>
      </View>
      <View>
        <Button
          mode="text"
          onPress={addFriend}
          loading={loading}
          disabled={isAdded}
        >
          Add
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
});
