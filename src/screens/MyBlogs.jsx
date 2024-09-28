import React from 'react'
import { useEffect, useState } from 'react'

// fireabse imports 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

      }

      else {
        console.log("no data");

      }

    });

  }

  // call data 
  useEffect(() => {
    getDataFromFirestore()
  }, [])


  // JSX 
  return (
    <>
      <h1 className='text-center l-bg py-5 text-[2rem]'>My All blogs</h1>
      <div className=' mt-5'>
        {blogArr && blogArr.map((item, index) => {
          return (
            <div className='w-[1050px] p-5 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-[3rem]' key={index}>

              {/* image and username  */}
              <div className='flex items-center justify-start p-4  rounded-md'>
                <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
                <div>
                  <p className='text-[1.6rem] font-semibold text-gray-800 capitalize '> {item.name}</p>
                </div>
              </div>

              {/* title and description  */}
              <div className='p-4 text-left'>
                <h2 className='text-[1.5rem] mt-3 font-[600] capitalize text-black'><span className='font-bold '> </span> {item.title}</h2>
                <p className='text-[1.2rem] text-[#6a6a6a] mt-3'><span className='font-semibold'></span> {item.description}</p>
              </div>
            </div>

          )
        })}</div>
    </>

  )
}

export default MyBlogs