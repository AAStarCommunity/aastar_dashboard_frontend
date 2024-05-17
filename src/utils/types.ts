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

export type ObjType<T = any> = Record<string, T>;

export interface IFromItemProps<T = any> {
  required?: boolean;
  defaultValue?: T;
  setValue?: (value: T) => void;
  errorTip?: string;
  placeholder?: string;
  label?: string;
  desc?: string;
  name: string;
  class?: string;
  disabled?: boolean;
  inputType?: string;
  group?: string;
  addlist?: boolean;
  isControl?: boolean;
}

export interface IFromItemRefs<T = any> {
  getData: () => { value: T | undefined; vaild: boolean };
  handleVaild: (value: string) => void;
}
