import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import lottieLogin from "../assets/lotties/login.json"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Notyf } from "notyf";


const Login = () => {

  const from = location?.state?.from?.pathname || "/";
  console.log(location.state)


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
 
  const navigate = useNavigate();
  const {loginUser} = useAuth();

 const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit =(data)=>{
   console.log(data);
   loginUser(data.email,data.password)
   .then(result=>{
    console.log(result.user);
    navigate(from,{replace:true});

    if(result.user){
        notyf.success("Login Successful");
    }

   })
   .catch(error=>{
    notyf.error("Login failed");
   })
  }



  return (
    <div>
     <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around gap-12 px-6">


     <div className="min-h-screen items-center flex  justify-center mx-auto ">
   <Card className="w-full max-w-md px-10 py-10">
   <h1 className="text-center text-green-500 font-semibold text-3xl">Login to your account</h1>
  <form onSubmit={handleSubmit(onSubmit)}className="flex  flex-col gap-4">
    
      <div>
     
        <div className="mb-2 block">
          <Label htmlFor="email2">Email</Label>
        </div>
        <TextInput {...register("email",{required:true})} id="email2" name="email" type="email" placeholder="name@flowbite.com" required shadow />
      </div>
      <div>
        <div className="mb-2 block">
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
    Login
  </span>
</button>

    </form>
    <p>Doesn't have an account? <Link className="text-green-500" to={"/signUp"}>Register</Link></p>
 </Card>
</div>
    
<div className="flex items-center mx-auto justify-center">
      {/* <img  className="w-48 object-contain"  src={logo} alt="" /> */}

      <Lottie className="h-full w-[700px]" animationData={lottieLogin}></Lottie>
     
    </div>
    
    
    

    </div>
    </div>
  );
};

export default Login;