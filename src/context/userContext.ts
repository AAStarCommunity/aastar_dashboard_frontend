import { useAppContext, connectFactory } from "../utils/contextFactory";

import { IUser } from "../utils/types";

export const KEY = "userInfo";
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext<IUser>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);
