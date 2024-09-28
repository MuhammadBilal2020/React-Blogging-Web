import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from '../firebaseConfig/firebaseMethod';
import { useNavigate, useParams } from 'react-router-dom';

function SingleUser() {
  const { uid } = useParams();  // Get the uid from the route parameter
  let navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);

  // Fetch user data from Firestore
  useEffect(() => {
    const getUserBlogs = async () => {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const usersSnapshot = await getDocs(q);
      let userOne = [];
      usersSnapshot.forEach((doc) => {
        console.log(doc.data());
        userOne.push(doc.data()); // Collect user data
      });
      setProfileData(userOne);
    };

    getUserBlogs();
  }, [uid]);

  // Function to navigate to user's blogs
  function myBlogs(uid) {
    navigate(`/singleUserBlogs/${uid}`);
  }

  return (
    <div>
      <h1 className='text-center  l-bg py-5 text-[2rem]'>User profile</h1>

      {profileData.length > 0 ? profileData.map((item, index) => (
        <div key={index} className="mt-[3rem] flex justify-center items-center">
          {/* Profile Card */}
          <div className="l-bg w-[40rem] border-[.1rem] border-[#d8d7d7] max-w-lg shadow-lg rounded-lg overflow-hidden p-[2rem]">
            {/* Profile Image */}
           
            <div className="h-[15rem] flex justify-center items-center">
              <img 
                src={item.userPic} 
                alt="Profile"
                className="rounded-full h-[14rem] w-[14rem] object-contain border-4 border-white shadow-lg" 
              />
            </div>
        
            {/* Profile Info */}
            <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold capitalize">{item.firstName}</h2>
              <button 
                onClick={() => myBlogs(item.uid)} 
                className="mt-[3rem] px-4 py-2  text-white rounded-lg black-bg hover:bg-[#8b65f1]"
              >
                View My Blogs
              </button>
            </div>
          </div>
        </div>
      )) : (
        <h1 className='text-center text-[1.5rem] mt-8'>loading...</h1>
      )}
    </div>
  );
}

export default SingleUser;
