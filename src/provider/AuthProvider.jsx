import { createUserWithEmailAndPassword } from "firebase/auth";

import { createContext, useState } from "react";
import { auth } from "../firebase/firebaseInit";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {

  const [loading,setLoading] = useState(true);
  const [user,setUser ]  = useState(null);


 const createUser = (email,password)=>{
   setLoading(true)
   return createUserWithEmailAndPassword(auth,email,password)
 }

  const authInfo = {
    loading,
    user,
    createUser
  }

  return (
    <div>
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;