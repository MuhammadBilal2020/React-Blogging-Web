import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig/firebaseMethod';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';

function Profile() {
  let [profileData, setProfileData] = useState([]);
  let navigate = useNavigate();

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
        });
        setProfileData(userOne);
      } else {
        console.log("no data");
      }
    });
  }

  // call get function 
  useEffect(() => {
    getDataFromFirestore();
  }, []);

  // go to my blogs 
  function goToMyBlogs() {
    navigate('/myBlogs');
  }

  // JSX 
  return (
    <>
      <div>
        <h1 className='text-center l-bg py-5 text-2xl md:text-3xl font-bold'>Profile</h1>
      </div>

      {profileData.length > 0 ? profileData.map((item, index) => {
        return (
          <div key={index} className="mt-8 flex justify-center items-center">
            {/* Profile Card */}
            <div className="l-bg w-full max-w-lg border border-[#d8d7d7] shadow-lg rounded-lg overflow-hidden p-6">
              {/* Profile Image */}
              <div className="h-56 flex justify-center items-center mb-4">
                <img
                  src={item.userPic}
                  alt="Profile"
                  className="rounded-full h-36 w-36 object-contain border-4 border-white shadow-lg"
                />
              </div>

              {/* Profile Info */}
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold capitalize">{item.firstName}</h2>
                <button
                  onClick={goToMyBlogs}
                  className="mt-6 px-4 py-2 text-white rounded-lg black-bg hover:bg-[#8b65f1] transition duration-200"
                >
                  View My Blogs
                </button>
              </div>
            </div>
          </div>
        );
      }) : <h1 className='text-center text-lg md:text-xl'>Loading...</h1>}
    </>
  );
}

export default Profile;
