import AddFriend, { FriendType } from "@/components/chat/AddFriend";
import socket from "@/constants/socket";
import { Channel, User } from "@/type/chat";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import debounce from "lodash/debounce";

export default function AddFriendScreen() {
  const [users, setUsers] = useState<FriendType[]>([]);
  const [userName, setUserName] = useState<string>("");

  const searchUser = async () => {
    const rs = await socket.emitWithAck("user:search", {
      q: "",
    });

    setUsers(rs.data);
  };

  const searchUserDebounce = debounce(searchUser, 1000);

  useEffect(() => {
    searchUserDebounce();
  }, [userName]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          placeholder="User name"
        />
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <AddFriend {...item} />}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  input: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
  },
});
