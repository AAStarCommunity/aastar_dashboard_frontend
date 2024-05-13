import { IMessage } from "./types";

export default function Message(options: IMessage) {
  const message = new CustomEvent("message", {
    detail: options,
  });
  document.body.dispatchEvent(message);
}
