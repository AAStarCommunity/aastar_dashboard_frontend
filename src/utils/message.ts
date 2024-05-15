import { IMessage } from "./types";

export default function Message(options: IMessage) {
  const message = new CustomEvent("message", {
    detail: {
      show: true,
      ...options,
    },
  });
  document.body.dispatchEvent(message);
}
