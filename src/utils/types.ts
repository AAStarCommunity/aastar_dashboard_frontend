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

export interface IStore<T> {
  key: string;
  store: T;
  setStore: (payload: Partial<T>) => void;
}

export type setStateType = React.Dispatch<
  React.SetStateAction<string | boolean>
>;

export interface ObjType {
  [key: string]: any;
}
