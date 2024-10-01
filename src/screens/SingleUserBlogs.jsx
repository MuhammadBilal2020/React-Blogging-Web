import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';

function SingleUserBlogs() {
  const { uid } = useParams();  // This captures the uid from the route
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getUserBlogs = async () => {
      // Call blogs data from Firestore 
      const q = query(collection(db, "Blogs"), where("uid", "==", uid));
      const usersSnapshot = await getDocs(q);
      let Blogs = [];
      usersSnapshot.forEach((doc) => {
        Blogs.push(doc.data());
      });

      setBlogs(Blogs);
    };

    getUserBlogs();
  }, [uid]);

  // JSX 
  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <h1 className='text-center l-bg py-5 md:text-[1.5rem] sm:text-[1.3rem] text-[1.2rem] 2xl:text-[2rem]'>All Blogs of this user</h1>
      <div className='grid grid-cols-1 gap-5 mt-[2rem] md:grid-cols-2 lg:grid-cols-3'>
        {blogs.length > 0 ? blogs.map((item, index) => (
          <div className='p-5 l-bg shadow-lg rounded-lg overflow-hidden' key={index}>
            {/* First line: Profile picture and title */}
            <div className='flex items-center justify-start p-4 rounded-md'>
              <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
              <div>
                <p className='md:text-[1.4rem] sm:text-[1.3rem] text-[1.2rem] 2xl:text-[1.6rem] font-semibold capitalize text-gray-800'> {item.name}</p>
              </div>
            </div>

            {/* Title and description */}
            <div className='p-4 text-left'>
              <h2 className='md:text-[1.4rem] sm:text-[1.3rem] text-[1.2rem] 2xl:text-[1.6rem] mt-3 font-[600] capitalize text-black'> {item.title}</h2>
              <p className='md:text-[1.3rem] sm:text-[1.1rem] text-[1rem] 2xl:text-[1.2rem] text-[#6a6a6a] mt-3'>{item.description}</p>
            </div>
          </div>
        )) : <h1 className='text-center text-[1.5rem] mt-8'>Loading...</h1>}
      </div>
    </div>
  );
}

export default SingleUserBlogs;
