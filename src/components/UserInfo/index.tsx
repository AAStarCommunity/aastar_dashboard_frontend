import { IPropChild } from '@/utils/types';
import { connect } from '@/context/userContext';

/**
* Get the user information component
*/
const UserInfo = ({ children }: IPropChild) => {
  return (
    < >
      {children}
    </ >
  );
};

export default connect(UserInfo);
