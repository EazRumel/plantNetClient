import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,onAuthStateChanged, updateProfile } from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseInit";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
  const axiosPublic = useAxiosPublic();

  const [loading,setLoading] = useState(true);
  const [user,setUser ]  = useState(null);


 const createUser = (email,password)=>{
   setLoading(true)
   return createUserWithEmailAndPassword(auth,email,password)
 }

 const loginUser = (email,password) => {
   setLoading(true);
   return signInWithEmailAndPassword(auth,email,password);
 }

 const updateUser =(name,photo) =>{
  return updateProfile(auth.currentUser,{
     displayName:name,
     photoURL:photo
  })
 }

 const logOut = () =>{
  setLoading(true);
  return signOut(auth);
 }

 useEffect(()=>{
   const unsubscribe = onAuthStateChanged(auth,currentUser=>{
    console.log(currentUser);
    setUser(currentUser)


     if(currentUser?.email){
       const user = {email : currentUser.email}
         axiosPublic.post("/jwt",user,{withCredentials:true})
         .then(res=>{

          {

          console.log("from logIn",res.data)
          setLoading(false)

          }

         })
     }
     else{
           axiosPublic.post("/logOutJwt",{},     
            {withCredentials:true})
           .then(res=>{
            {
              console.log("from logOut",res.data)
              setLoading(false);
            }
           })
     }
    setLoading(false);
   })


    return () =>{
      return unsubscribe();
    }

 },[])

  const authInfo = {
    loading,
    user,
    createUser,
    loginUser,
    logOut,
    updateUser
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