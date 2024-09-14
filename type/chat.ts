export interface User {
  id: string;
  username: string;
  is_online: boolean;
}

export interface Channel {
  id: string;
  name: string;
  users: string[];
}
