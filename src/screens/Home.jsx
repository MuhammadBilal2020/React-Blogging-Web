import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';
import { useNavigate } from 'react-router-dom';

function Home() {
  let [data, setData] = useState([]);
  const navigate = useNavigate();

  function singleUser(uid) {
    navigate(`singleUser/${uid}`);
  }

  // get data 
  async function getDataFromFirestore() {
    // get blogs data from firestore 
    let blogs = [];
    const blogsSnapshot = await getDocs(collection(db, "Blogs"));
    blogsSnapshot.forEach((doc) => {
      blogs.push(doc.data());
    });

    setData(blogs);
  }

  // call get function 
  useEffect(() => {
    getDataFromFirestore();
  }, []);

  // jsx 
  return (
    <>
      <h1 className='text-center text-2xl md:text-3xl font-bold mt-6'>All Blogs</h1>

      {data.length > 0 ? data.map((item, index) => {
        return (
          <div className='max-w-screen-lg p-5 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-5' key={index}>
            {/* image and username  */}
            <div className='flex items-center justify-start p-4'>
              <button onClick={() => singleUser(item.uid)}>
                <img src={item.pic} className='h-12 w-12 object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
              </button>
              <div>
                <p className='text-xl md:text-2xl font-semibold capitalize text-gray-800'>{item.name}</p>
              </div>
            </div>

            {/* title and description  */}
            <div className='p-4 text-left'>
              <h2 className='text-xl md:text-2xl mt-3 font-semibold capitalize text-black'>{item.title}</h2>
              <p className='text-base md:text-lg mt-3'>{item.description}</p>
            </div>
          </div>
        );
      }) : <h1 className='text-center text-lg md:text-xl mt-8'>Loading...</h1>}
    </>
  );
}

export default Home;
