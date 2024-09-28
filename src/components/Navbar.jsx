import React, { useEffect, useState } from 'react'
import { FaShopify } from "react-icons/fa";
import { Link } from 'react-router-dom';

import {  signOut , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';
import { auth } from '../firebaseConfig/firebaseMethod';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Swal from 'sweetalert2';

function Navbar() {

  let [pic , setPic] = useState('')
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


      
        const getUserBlogs = async () => {
          const q = query(collection(db, "users"), where("uid", "==", u));
          const usersSnapshot = await getDocs(q);
          let userOne = [];
          usersSnapshot.forEach((doc) => {
            console.log(doc.data());
            userOne.push(doc.data()); // Collect user data
            setPic(doc.data().userPic)
            
          });
          console.log(pic);
          
          
        };
    
        getUserBlogs();
      
  
    });
  }, [])
  

  function signOuts() {
    signOut(auth).then(() => {
      

      Swal.fire({
        text: "successfully signout",
        icon: "success"
      }).then(() => { 
        window.location.reload();
      });

      navigate("/login")


    })
    .catch((error) => {
      console.log(error);
      
    });

  }
  return (

    <>

      <div className="navbar black-bg l-color p-3 flex items-center justify-between">

        <div className='shadow-md w-[30rem] px-[1rem] py-[.4rem] flex justify-start items-center  gap-5'>
          <p className='text-[2rem]'> <FaShopify className='text-[]' /> </p>
          <h1 className='font-bold text-[1.9rem]'>Personal Blogging Website</h1>
        </div>

        <div className="w-[36rem] px-[1rem] py-[.4rem]  flex justify-start items-center  gap-5 ">

{u ?
<>
<Link to="" className='text-[1.4rem]'>Home</Link>  
<Link to="dashboard" className='text-[1.4rem]'>Dashboard</Link>

<button className='w-[6rem] black-color l-gray-bg hover:bg-[#6333e8]  py-2 px-3  rounded-lg block' onClick={signOuts}>Signout</button>
<Link to="profile" className='text-[1.4rem]'><img src= {pic} className='w-[4rem] h-[4rem] rounded-full  object-contain l-bg shadow-lg'  /></Link>

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