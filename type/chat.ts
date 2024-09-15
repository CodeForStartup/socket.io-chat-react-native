export interface User {
  id: string;
  username: string;
  is_online: boolean;
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
}
