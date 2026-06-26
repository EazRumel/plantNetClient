// import { useContext } from "react";
// import { useForm } from "react-hook-form"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import lottieRegister from "../assets/lotties/register.json";
// import Link from "next/link";

 
 

import { AuthContext } from "../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { Notyf } from "notyf";
import 'notyf/notyf.min.css';
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/SocialLogin";
import { imageUpload } from "../api/utils";
import { LoaderPinwheel } from "lucide-react";




const SignUp = () => {

  const {loading} = useAuth();

  const axiosPublic = useAxiosPublic();

   const notyf = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: 'green',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'success'
      }
    },
    {
      type: 'success',
      background: 'green',
      duration: 2000,
      dismissible: true
    }
  ]
});

// useNavigate to send user to home route after successful signup
  const navigate = useNavigate();
  const {createUser,updateUser} = useAuth();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

 const onSubmit = async(data) => {

try{

    console.log(data);
    

   
  // console.log(res.data.data.display_url);
 
    // const image = data.photo[0];
    // const photoURL = await imageUpload(image);

    // console.log(data.photo[0]);

    const image = data.photo[0];
    console.log(data.photo[0]);



    const photoUrl = await imageUpload(image);

    // 1. Create Firebase user
     const result = await createUser(data.email, data.password);
    // console.log(result.user);

    // 2. Update Firebase profile
    await updateUser(data.name,photoUrl);

    // 3. Save user to database
    const userInfo = {
      email: data.email,
      name: data.name,
      // role:"customer"
    };

  const response = await axiosPublic.post("/users", userInfo)
   
      if (response.data.insertedId) {
      notyf.success("Sign Up successful");
      navigate("/");
    }
      
    console.log(response.data);
}
  catch(error){
     console.log(error)
     console.log(error?.response.data)
    console.log(error.message);
    notyf.error("Sign Up Failed!!")
  }


    // 5. Redirect after success
     
};

  // console.log(watch("example")) // watch input value by passing the name of it

  // const {user,setUser} = useContext(AuthContext)
  
  return (

  // Main Div
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around gap-12 px-6">
    
{/* Lottie React Div */}
    
<div className="flex items-center mx-auto justify-center">
      {/* <img  className="w-48 object-contain"  src={logo} alt="" /> */}

      <Lottie className="h-full w-[700px]" animationData={lottieRegister}></Lottie>
     
    </div>
    
    {/* Div for Card Item of Sign Up */}
    <div className="min-h-screen items-center flex  justify-center mx-auto ">
   <Card className="w-full max-w-md px-10 py-10">
   <h1 className="text-center text-green-500 font-semibold text-3xl">Sign Up</h1>
  <form onSubmit={handleSubmit(onSubmit)}className="flex  flex-col gap-4">
     <div>
     
        <div className="mb-2 block">
          <Label htmlFor="your name">Your Name</Label>
        </div>
        <TextInput {...register("name",{required:true})} id="email2" name="name" type="text" placeholder="type your name" required shadow />
      </div>
     <div>
     
        <div className="mb-2 block gap-4">
          <Label htmlFor="your name">Choose a photo</Label>
          
        </div>
        <input {...register("photo",{required:true})} className="file-input file-input-accent w-64 h-8" name="photo" type="file" placeholder="place a photo" required shadow />

      </div>
      <div>
      
     
        <div className="mb-2 block">
          <Label htmlFor="email2">Email</Label>
        </div>
        <TextInput {...register("email",{required:true})} id="email2" name="email" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
           
        {/* Input for Password */}
          <Label htmlFor="password2">Password</Label>
        </div>
        <TextInput {...register("password",{required:true,minLength:6,maxLength:20,pattern:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/})} name="password" id="password2" type="password" required shadow />
        
        {errors.password?.type == "required" && <p className="text-red-500">Password is required</p>}
        {errors.password?.type == "minLength" && <span className="text-red-500">Password must be of 6 characters</span>}
    {errors.password?.type == "maxLength" && <span className="text-red-500">
      Password cannot be more then 20 characters
    </span>}
    {errors.password?.type == "pattern" && <span className="text-red-500">
      Password must have one single letter,one uppercase,one lowercase and a single symbol
    </span>}
      </div>
        {/* <input className="btn cursor-pointer bg-green-500 text-white" type="submit" value="Register" /> */}

<button
  type="submit"
  className="
    btn relative overflow-hidden group
    bg-transparent border border-green-500 text-green-500
    transition-shadow duration-200
    hover:shadow-lg
  "
>
  {/* Pour layer */}
  <span
    className="
      absolute inset-0 bg-green-500
      transform scale-y-0 origin-top
      transition-transform duration-300 ease-out delay-75
      group-hover:scale-y-100
    "
  ></span>

  {/* Text */}
  <span
    className="
      relative z-10
      transition-colors duration-150
      group-hover:text-white
    "
  >

   { 
    loading ? <LoaderPinwheel className="animate-spin" /> : 
     "Register"
     }
  </span>
</button>

    </form>
    <SocialLogin></SocialLogin>
    <p>Already have an account? <Link className="text-green-500" to={"/login"}>Login</Link></p>

 </Card>
</div>
    </div>
  );
};

export default SignUp;
