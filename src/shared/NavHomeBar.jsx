import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import logo from "../assets/img/plantLogo.jpg"
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";


const NavHomeBar = () => {


  const {user,logOut} = useAuth();

  const handleLogOut =() =>{
     logOut()
    //  console.log(logOut)
    .catch(error=>{
      console.log(error.message)
    })
  }

return(


     <Navbar  fluid rounded className="my-5 ">
      <NavbarBrand href="">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tree Planet</span>
      </NavbarBrand>
      <div className="flex md:order-2">
       {
        user ? 

        //Dropdown menu when user is logged in
         <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={user.photoURL} rounded
             />
          }
        >

        
           <DropdownHeader>
            <span className="block text-sm">{user.displayName}</span>
            <span className="block truncate text-sm font-medium">{user.email}</span>
          </DropdownHeader>

          
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
         <DropdownItem onClick={handleLogOut}>Sign Out</DropdownItem>
          
        </Dropdown>
        
        
        
         :
         //Dropdown menu when user is not logged in 
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded
             />
          }
        >

        
           

          
          {/* <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider /> */}
         <DropdownItem><Link to="/login">Sign In</Link></DropdownItem>
          
        </Dropdown>
       }
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {/* <NavbarLink href="#" active>
          Home
        </NavbarLink> */}
        <NavbarLink className="hover:text-green-500 " href="/">Home</NavbarLink>
        <NavbarLink className="hover:text-green-500"  href="#">About</NavbarLink>
        <NavbarLink className="hover:text-green-500"  href="#">Services</NavbarLink>
        <NavbarLink className="hover:text-green-500"  href="#">Pricing</NavbarLink>
        <NavbarLink className="hover:text-green-500"  href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>

)
};

export default NavHomeBar;