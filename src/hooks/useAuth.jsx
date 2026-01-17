import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { auth } from '../firebase/firebaseInit';

const useAuth = () => {


  const authInfo = useContext(AuthContext);
  return authInfo;


};

export default useAuth;