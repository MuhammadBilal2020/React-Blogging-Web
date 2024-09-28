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


  async function getDataFromFirestore() {
    let blogs = []
    const blogsSnapshot = await getDocs(collection(db, "Blogs"));
    blogsSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());


      blogs.push(doc.data())
    });

    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data());
      user.push(doc.data())
    });
    
    setData(blogs)


  }



  useEffect(() => {
    getDataFromFirestore()
  }, [])




  return (
    <>
      <h1 className='text-center text-[2rem]'>All Blogs</h1>

      {data.length > 0 ? data.map((item, index) => {
        return (
          <div className='w-[1050px] p-5 mx-auto bg-[#3C3D37] shadow-lg rounded-lg overflow-hidden mt-5' key={index}>
            {/* First line: Profile picture and title */}
            <div className='flex items-center justify-start p-4 bg-gray-100'>
              <button onClick={() => singleUser(item.uid)}>
                <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />

              </button>
              <div>
                <p className='text-[2rem] font-semibold text-gray-800'> {item.name}</p>
              </div>
            </div>

            {/* Second line: UID and description */}
            <div className='p-4 text-left'>
            <h2 className='text-[1.5rem] mt-3 font-[600] text-black'><span className='font-bold '>Title:</span> {item.title}</h2>
            <p className='text-[1.2rem] l-color mt-3'><span className='font-semibold'>Description:</span> {item.description}</p>

            </div>
          </div>
        )
      }) : <h1 className='text-center text-[1.5rem] mt-8'>loading...</h1>}


    </>
  )
}

export default Home
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// import { db } from '../firebaseConfig/firebaseMethod';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   function singleUser(uid) {
//     // Navigate to the single user's page with their uid
//     navigate(`/singleUser/${uid}`);
//   }

//   async function getDataFromFirestore() {
//     let blogs = [];
//     const blogsSnapshot = await getDocs(collection(db, "Blogs"));
//     blogsSnapshot.forEach((doc) => {
//       blogs.push(doc.data());
//     });
//     setData(blogs);
//   }

//   useEffect(() => {
//     getDataFromFirestore();
//   }, []);

//   return (
//     <>
//       <h1 className='text-center text-[2rem]'>All Blogs</h1>

//       {data ? data.map((item, index) => (
//         <div className='w-[1000px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-[3rem]' key={index}>
//           <div className='flex items-center justify-start p-4 bg-gray-100'>
//             <button onClick={() => singleUser(item.uid)}>
//               <img src={item.pic} className='h-[50px] w-[50px] object-contain rounded-full mr-4 shadow-lg shadow-slate-800' alt="Profile" />
//             </button>
//             <div>
//               <p className='text-[2rem] font-semibold text-gray-800'>Title: {item.title}</p>
//             </div>
//           </div>
//           <div className='p-4 text-left'>
//             <p className='text-[1.5rem] text-gray-600'><span className='font-semibold'>UID:</span> {item.uid}</p>
//             <p className='text-[1.5rem] text-gray-600 mt-1'><span className='font-semibold'>Description:</span> {item.description}</p>
//           </div>
//         </div>
//       )) : <h1 className='text-center mt-5 text-[3rem]'>..loading</h1>}
//     </>
//   );
// }

// export default Home;
