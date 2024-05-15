export interface IPropChild {
  children: React.ReactNode;
}
export interface IUsers {
  id: string;
  name: string;
  desc: string;
  avatar: string;
  refetchHandler?: () => void;
}
export type IUser = IUsers | null;
export interface IAlertProps {
  type: MessageType;
  message: string;
  onClose?: () => {};
}
export type MessageType = "success" | "danger" | "warning" | "info" | "neutral";
export interface IMessage extends IAlertProps {
  show?: boolean;
  delay?: number;
}

export interface IStore<T> {
  key: string;
  store: T;
  storage?: boolean;
  setStore: (payload: Partial<T>) => void;
}

export type setStateType = React.Dispatch<
  React.SetStateAction<string | boolean>
>;

export interface ObjType {
  [key: string]: any;
}

export interface IFromItemProps {
  required?: boolean;
  defaultValue?: string | boolean;
  setValue?: (value: string) => void;
  errorTip?: string;
  placeholder?: string;
  label?: string;
  desc?: string;
  name: string;
}

export interface IFromItemRefs {
  getData: () => Record<"value" | "vaild", boolean | string | undefined>;
  handleVaild: (value: string) => void;
}
