import React, { useEffect, useState } from 'react'
import { FaShopify } from "react-icons/fa";
import { Link } from 'react-router-dom';

import {  signOut , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { auth } from '../firebaseConfig/firebaseMethod';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

function Navbar() {

  // let pages = [<Home /> , <Login /> , <Register /> ]
  let [u , setU] = useState("")

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        
        const uid = user.uid;
        setU(uid)
        
  
      } else {
        setU(null)
        console.log("no data");
  
      }
  
    });
  }, [])
  

  function signOuts() {
    signOut(auth).then(() => {
      console.log('signout succcessfully');
      navigate("/login")


    }).catch((error) => {
      console.log(error);
      
    });

  }
  return (

    <>

      <div className="navbar black-bg l-color p-3 flex items-center justify-between">

        <div className='shadow-md w-[30rem] px-[1rem] py-[.4rem] flex justify-start items-center  gap-5'>
          <p className='text-[2rem]'> <FaShopify className='text-[]' /> </p>
          <h1 className='font-bold text-[2rem]'> My Ecommerce Website</h1>
        </div>

        <div className="w-[36rem] px-[1rem] py-[.4rem]  flex justify-start items-center  gap-5 ">

{u ?
<>
<Link to="" className='text-[1.4rem]'>Home</Link>  
<Link to="dashboard" className='text-[1.4rem]'>Dashboard</Link>
<Link to="profile" className='text-[1.4rem]'>Profile</Link>
<button className='w-[6rem] l-gray-bg hover:bg-[#586155]  py-2 px-3  rounded-lg block' onClick={signOuts}>Signout</button>
</>

  : <>
<Link to="" className='text-[1.4rem]'>Home</Link>  

  <Link to="login" className='text-[1.4rem]'>Login</Link>
  <Link to="register" className='text-[1.4rem]' >Register</Link>
  </>}










        </div>


      </div>


    </>

  )
}

export default Navbar