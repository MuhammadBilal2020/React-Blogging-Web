import React from 'react'
import { useEffect, useState } from 'react'

import { auth, db } from '../firebaseConfig/firebaseMethod';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';

function Profile() {

  let [profileData, setProfileData] = useState([])
  let navigate = useNavigate()

  async function getDataFromFirestore() {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // call user data from firestore 
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const usersSnapshot = await getDocs(q);
        let userOne = []; // Temporary array to hold the blogs
        usersSnapshot.forEach((doc) => {

          userOne.push(doc.data());
        })
        setProfileData(userOne)

      }
      else {
        console.log("no data");
      }

    })
  }

  // call get function 
  useEffect(() => {
    getDataFromFirestore()
  }, [])

  // go to my blogs 
  function goToMyBlogs() {
    navigate('/myBlogs')

  }

  // JSX 
  return (
    <>
    <div>
<h1 className='text-center  l-bg py-5 text-[2rem]'>Profile</h1>

    </div>

      {profileData.length > 0 ? profileData.map((item, index) => {
        return (
          <div key={index} className="mt-[3rem] flex justify-center items-center">
            {/* Profile Card */}
            <div className=" l-bg w-[40rem] border-[.1rem] border-[#d8d7d7] max-w-lg shadow-lg rounded-lg overflow-hidden p-[2rem]">
              {/* Profile Image */}
              <div className="h-[15rem] flex justify-center items-center">
                <img
                  src={item.userPic}
                  alt="Profile"
                  className="rounded-full h-[14rem] bg-black shadow-violet-300 w-[14rem] object-contain border-4 border-white shadow-lg" // Changed from object-cover to object-contain
                />
              </div>

              {/* Profile Info */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold capitalize">{item.firstName}</h2>
                
                <button
                  onClick={goToMyBlogs}
                  className="mt-[3rem] px-4 py-2  text-white rounded-lg black-bg hover:bg-[#8b65f1]  "
                >
                  View My Blogs
                </button>
              </div>
            </div>
          </div>

        )
      }) : <h1>loading..</h1>}

    </>
  )
}

export default Profile









