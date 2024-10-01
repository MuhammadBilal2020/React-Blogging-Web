import React, { useEffect, useState } from 'react';

// Firebase imports 
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { auth, db } from '../firebaseConfig/firebaseMethod';

function MyBlogs() {
  let [blogArr, setBlogArr] = useState([]);

  // Get data 
  async function getDataFromFirestore() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // Get blogs data from Firestore 
        const q2 = query(collection(db, "Blogs"), where("uid", "==", uid));
        const blogsSnapshot = await getDocs(q2);
        let Blogs = [];

        blogsSnapshot.forEach((doc) => {
          Blogs.push(doc.data());
        });

        setBlogArr(Blogs);
      } else {
        console.log("no data");
      }
    });
  }

  // Call data 
  useEffect(() => {
    getDataFromFirestore();
  }, []);

  // JSX 
  return (
    <>
      <h1 className='text-center l-bg py-5 text-[2rem]'>My All Blogs</h1>
      <div className='mt-5 flex flex-col items-center'>
        {blogArr && blogArr.map((item, index) => (
          <div className='w-[90%] md:w-[40rem] p-5 l-bg shadow-lg rounded-lg overflow-hidden mt-5' key={index}>
            {/* Image and username */}
            <div className='flex items-center justify-start p-4 rounded-md'>
              <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
              <div>
                <p className='text-[1.6rem] font-semibold text-gray-800 capitalize'>{item.name}</p>
              </div>
            </div>

            {/* Title and description */}
            <div className='p-4 text-left'>
              <h2 className='text-[1.5rem] mt-3 font-[600] capitalize text-black'>{item.title}</h2>
              <p className='text-[1.2rem] text-[#6a6a6a] mt-3'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyBlogs;
