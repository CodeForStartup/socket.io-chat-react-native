export interface User {
  id: string;
  username: string;
  isOnline: boolean;
}

export enum ChannelType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export interface Channel {
  id: string;
  name: string;
  users: string[];
  type: ChannelType;
  unreadCount?: number;
  messages?: Message[];
  hasMore?: boolean;
  isLoaded?: boolean;
  typingUsers?: string[];
}

export interface Message {
  id: string;
  mid: number;
  channelId: string;
  content: string;
  from: string;
}
