import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHook';
import { LoadingIcon } from "@/assets/icons";
import "./index.module.css"

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();
  return (
    <div style={{ height: '100%', position: "relative" }} >
      {loading && <div style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.2)"
      }}><LoadingIcon className="turn" style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto"
      }} /></div>}
      {children}
    </div >
  );
};

export default connect(UserInfo);
