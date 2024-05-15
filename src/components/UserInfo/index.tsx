import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/context/userContext';
import Spin from '../Spin';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();
  return (
    < >
      {loading &&
        <Spin />
      }
      {children}
    </ >
  );
};

export default connect(UserInfo);
