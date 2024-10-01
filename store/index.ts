import { Channel, User } from "@/type/chat";
import { create } from "zustand";

interface AppStore {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
  listChannel: Channel[];
  setListChannel: (listChannel: Channel[]) => void;
  listUser: Map<string, User>;
  setListUser: (listUser: Map<string, User>) => void;
  currentChannel: Channel | null;
  setCurrentChannel: (currentChannel: Channel | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),
  listChannel: [],
  setListChannel: (listChannel) => set({ listChannel }),
  listUser: new Map(),
  setListUser: (listUser) => set({ listUser }),
  currentChannel: null,
  setCurrentChannel: (currentChannel) => set({ currentChannel }),
}));

// select user by id
export const useGetUserByIdAppStore = (id?: string) => {
  if (!id) return null;

  const user = useAppStore.getState().listUser.get(id);
  return user;
};

// select list channel
export const selectListChannel = (state: AppStore) => state.listChannel;
