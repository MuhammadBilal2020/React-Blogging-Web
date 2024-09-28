import React from 'react'

import{ useEffect, useRef, useState } from 'react'

import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig/firebaseMethod';

function MyBlogs() {
  let [blogArr, setBlogArr] = useState([])

// get data 
async function getDataFromFirestore() {


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      


      
    


      // get blogs data from fire store 
      const q2 = query(collection(db, "Blogs"), where("uid", "==", uid));
      const blogsSnapshot = await getDocs(q2);
      let Blogs = [];

      blogsSnapshot.forEach((doc) => {
        Blogs.push(doc.data());
      })

      setBlogArr(Blogs);
      console.log(Blogs);
      


    } else {
      console.log("no data");

    }

  });
  
  
}

// call data 
useEffect(() => {
  getDataFromFirestore()
}, [])

  return (
    <>
    <h1 className='text-center text-[2rem]'>My blogs</h1>
    <div className=' mt-5'>
        {blogArr && blogArr.map((item, index) => {
          return (
            <div className='w-[1050px] p-5 mx-auto bg-[#3C3D37] shadow-lg rounded-lg overflow-hidden mt-5' key={index}>
              {/* First line: Profile picture and title */}
              <div className='flex items-center justify-start p-4 bg-gray-100 rounded-md'>
                <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
                <div>
                  <p className='text-[1.6rem] font-semibold text-gray-800'>Title: {item.title}</p>
                </div>
              </div>

              {/* Second line: UID and description */}
              <div className='p-4 text-left'>
              <h2 className='text-[1.5rem] mt-3 font-[600] text-black'><span className='font-bold '>Title:</span> {item.title}</h2>
              <p className='text-[1.2rem] l-color mt-3'><span className='font-semibold'>Description:</span> {item.description}</p>
              </div>
            </div>

          )
        })}</div>
    </>
    
  )
}

export default MyBlogs