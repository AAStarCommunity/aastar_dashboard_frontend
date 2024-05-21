import { useAppContext, connectFactory } from "@/utils/contextFactory";
import { IMessage, } from "@/utils/types";


const KEY = "common";
const DEFAULT_VALUE = {
    show: false,
    delay: 2000,
    message: "1212",
    type: "info"
};

export const useMessageContext = () => useAppContext<IMessage>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE, false);




