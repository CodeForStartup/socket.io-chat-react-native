import socket from "@/constants/socket";
import { User } from "@/type/chat";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";

export default function AddFriendScreen() {
  const [users, setUsers] = useState<User[]>([]);

  const searchUser = async () => {
    const rs = await socket.emitWithAck("user:search", {
      q: "",
    });

    setUsers(rs.data);
  };

  useEffect(() => {
    searchUser();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={users}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
    </SafeAreaView>
  );
}
