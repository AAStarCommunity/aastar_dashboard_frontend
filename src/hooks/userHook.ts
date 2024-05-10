import { useRouter } from "next/router";
import { useAppContext, connectFactory } from "../utils/contextFactory";

import { IUser } from "../utils/types";

const KEY = "userInfo";
const DEFAULT_VALUE = {};

export const useUserContext = () => useAppContext<IUser>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const router = useRouter();
  const nav = router.push;
  const pathname = router.pathname;
  // const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
  //   onCompleted: (data: any) => {
  //     if (data.getUserInfo) {
  //       const { id, name, tel, desc, avatar } = data.getUserInfo;
  //       setStore({
  //         id,
  //         name,
  //         desc,
  //         avatar,
  //         // refetchHandler: refetch,
  //       });
  //       // 当前在登录页面，且已经登录了，那就直接跳到首页
  //       if (pathname === "/login") {
  //         nav("/");
  //       }
  //       return;
  //     }
  //     // setStore({ refetchHandler: refetch });
  //     // 如果不在登录页面，但是目前没有登录，那就直接跳到登录页面
  //     if (pathname !== "/login") {
  //       nav(`/login?orgUrl=${location.pathname}`);
  //     }
  //   },
  //   onError: () => {
  //     // setStore({ refetchHandler: refetch });
  //     // 如果不在登录页面，但是目前登录异常，那就直接跳到登录页面
  //     if (pathname !== "/login") {
  //       nav(`/login?orgUrl=${location.pathname}`);
  //     }
  //   },
  // });
};
