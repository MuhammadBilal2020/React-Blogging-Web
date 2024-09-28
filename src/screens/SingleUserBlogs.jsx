import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';

function SingleUserBlogs() {
  const { uid } = useParams();  // This captures the uid from the route
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getUserBlogs = async () => {

      // call blogs data from firestore 
      const q = query(collection(db, "Blogs"), where("uid", "==", uid));
      const usersSnapshot = await getDocs(q);
      let Blogs = []; // 
      usersSnapshot.forEach((doc) => {
        Blogs.push(doc.data());
      })

      setBlogs(Blogs)
    };

    getUserBlogs();
  }, [uid]);


// JSX 
  return (
    <div>
      <h1 className='text-center l-bg py-5 text-[2rem]'>All Blogs of this user</h1>
      <div className=' mt-[2rem]'>
        {blogs.length > 0 ? blogs.map((item, index) => {
          return (
            <div className='w-[1050px] p-5 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-5' key={index}>
              {/* First line: Profile picture and title */}
              <div className='flex items-center justify-start p-4 rounded-md '>
                <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
                <div>
                  <p className='text-[1.6rem] font-semibold capitalize text-gray-800'> {item.name}</p>
                </div>
              </div>

              {/* title and description  */}
              <div className='p-4 text-left'>
                <h2 className='text-[1.5rem] mt-3 font-[600] capitalize text-black'> {item.title}</h2>
                <p className='text-[1.2rem] text-[#6a6a6a] mt-3'><span className='font-semibold'></span> {item.description}</p>
              </div>
            </div>

          )
        }) : <h1 className='text-center text-[1.5rem] mt-8'>loading...</h1>}  </div>
    </div>
  )
}

export default SingleUserBlogs;
