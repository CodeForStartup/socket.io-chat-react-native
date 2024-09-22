import { Channel, User } from "@/type/chat";
import { create } from "zustand";

interface AppStore {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
  listChannel: Channel[];
  setListChannel: (listChannel: Channel[]) => void;
  listUser: User[];
  setListUser: (listUser: User[]) => void;
  currentChannel: Channel | null;
  setCurrentChannel: (currentChannel: Channel | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  listChannel: [],
  setListChannel: (listChannel) => set({ listChannel }),
  listUser: [],
  setListUser: (listUser) => set({ listUser }),
  currentChannel: null,
  setCurrentChannel: (currentChannel) => set({ currentChannel }),
}));

// select user by id
export const useGetUserByIdAppStore = (id?: string) => {
  if (!id) return null;

  const user = useAppStore.getState().listUser.find((user) => user.id === id);
  return user;
};
