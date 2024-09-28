import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';
import { useNavigate } from 'react-router-dom';
function Home() {
  let [data, setData] = useState([])

  const navigate = useNavigate();
  let user = []
  function singleUser(uid) {
    navigate(`singleUser/${uid}`);
  }

  // get data 
  async function getDataFromFirestore() {

    // get blogs data from firestore 
    let blogs = []
    const blogsSnapshot = await getDocs(collection(db, "Blogs"));
    blogsSnapshot.forEach((doc) => {

      blogs.push(doc.data())
    });

    // get user data from firestore 
    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {


      user.push(doc.data())
    });

    setData(blogs)


  }

  // call get function 
  useEffect(() => {
    getDataFromFirestore()
  }, [])



  // jsx 
  return (
    <>
      <h1 className='text-center text-[2rem]'>All Blogs</h1>

      {data.length > 0 ? data.map((item, index) => {
        return (
          <div className='w-[1050px] p-5 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-5' key={index}>

            {/* image and username  */}
            <div className='flex items-center justify-start p-4 '>
              <button onClick={() => singleUser(item.uid)}>
                <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
              </button>
              <div>
                <p className='text-[2rem] font-semibold text-gray-800'> {item.name}</p>
              </div>
            </div>

            {/* title and description  */}
            <div className='p-4 text-left'>
              <h2 className='text-[1.5rem] mt-3 font-[600] text-black'><span className='font-bold '>Title:</span> {item.title}</h2>
              <p className='text-[1.2rem]  mt-3'><span className='font-semibold'>Description:</span> {item.description}</p>

            </div>
          </div>
        )
      }) : <h1 className='text-center text-[1.5rem] mt-8'>loading...</h1>
      }


    </>
  )
}

export default Home
