export interface IPropChild {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
}
