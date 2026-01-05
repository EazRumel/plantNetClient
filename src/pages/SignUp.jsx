// import { useContext } from "react";
// import { useForm } from "react-hook-form"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import lottieRegister from "../assets/lotties/register.json";
// import Link from "next/link";

 
 

import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";


const SignUp = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm()

  //  const onSubmit = (data) => console.log(data)

  // console.log(watch("example")) // watch input value by passing the name of it

  // const {user,setUser} = useContext(AuthContext)
  const handleSubmit =(event)=>{
        event.preventDefault();
  }
  
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around gap-12 px-6">
    
<div className="flex items-center mx-auto justify-center">
      {/* <img  className="w-48 object-contain"  src={logo} alt="" /> */}

      <Lottie className="h-full w-[700px]" animationData={lottieRegister}></Lottie>
     
    </div>
    
    <div className="min-h-screen items-center flex  justify-center mx-auto">
   <Card className="w-full max-w-md px-10 py-10">
   <h1 className="text-center text-green-500 font-semibold text-3xl">New User?Register</h1>
  <form onSubmit={handleSubmit} className="flex  flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2">Your email</Label>
        </div>
        <TextInput id="email2" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2">Your password</Label>
        </div>
        <TextInput id="password2" type="password" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="repeat-password">Repeat password</Label>
        </div>
        <TextInput id="repeat-password" type="password" required shadow />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
            terms and conditions
          </Link>
        </Label>
      </div>
      <Button type="submit">Register new account</Button>
    </form>
 </Card>
</div>
    

    </div>
  );
};

export default SignUp;