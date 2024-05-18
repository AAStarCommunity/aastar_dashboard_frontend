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
  setValue?: (value: T) => void; // getValue in component' outside,value in param
  errorTip?: string; // vaild error can show
  placeholder?: string;
  label?: string;
  desc?: string;
  name: string; // symble the filed
  class?: string; // classname
  disabled?: boolean;
  inputType?: "number" | "possword" | "phone" | "textarea";
  group?: string; // same content means in on group
  addlist?: boolean; // if use add button to add lisr in input
  isControl?: boolean; // control group  show and hide
  controlRevert?: boolean;
  list?: string[]; // just use for checkbox and select
}

export interface IFromItemRefs<T = any> {
  getData: () => { value: T | undefined; vaild: boolean };
  handleVaild: (value: string) => void;
}
