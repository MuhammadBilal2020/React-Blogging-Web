import React from 'react'
import  { useEffect, useState } from 'react'

import { auth, db } from '../firebaseConfig/firebaseMethod';
import {   onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { collection, query, where, getDocs , addDoc   } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';

function Profile() {
  
    let [profileData, setProfileData] = useState([])
    let navigate  = useNavigate()


  // async function getDataFromFirestore() {
  //   // Detect user authentication state
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       setUserUid(uid);  // Store the UID of the logged-in user
  
  //       try {
  //         // Query Firestore for the user whose UID matches the logged-in user
  //         const q = query(collection(db, "users"), where("uid", "==", uid));
  //         const usersSnapshot = await getDocs(q);
          
  //         // Store user data in state if it exists
  //         let userOne = [];
  //         usersSnapshot.forEach((doc) => {
  //           console.log(doc.data());  // Log the user's data for debugging
  //           setPic(doc.data().userPic);  // Set profile picture
  //           userOne.push(doc.data());  // Store user data
  //         });
  
  //         setProfileData(userOne);  // Update state with the logged-in user data
  
  //       } catch (error) {
  //         console.error("Error fetching user data: ", error);
  //       }
        
  //     } else {
  //       console.log("No user logged in");
  //     }
  //   });
  // }
  

  async function getDataFromFirestore() {
  
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        
    
        console.log(user.userPic);
    
        
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const usersSnapshot = await getDocs(q);
         let userOne = []; // Temporary array to hold the blogs
         usersSnapshot.forEach((doc) => {
           console.log(doc.data());
          
          
           
           userOne.push(doc.data()); 

         })
         setProfileData(userOne)


        
        // console.log(uid);
    
       
    
      } else {
       console.log("no data");
       
      }
    })
      }


      useEffect(()=>{

        getDataFromFirestore()
      },[])

      // go to my blogs 

      function goToMyBlogs(){
       navigate('/myBlogs')
        
      }

  return (
    <>
    
 
    
    {profileData.length > 0 ? profileData.map((item, index)=>{
     return(
      <div key={index} className="mt-[8rem] flex justify-center items-center">
      {/* Profile Card */}
      <div className=" d-gray-bg k w-[40rem]  max-w-lg shadow-lg rounded-lg overflow-hidden p-[1rem]">
        {/* Profile Image */}
        <h1 className='text-center l-color text-[2rem]'>Profile</h1>
        <div className="h-[15rem] flex justify-center items-center">
          <img 
            src={item.userPic} 
            alt="Profile"
            className="rounded-full h-[14rem] w-[14rem] object-contain border-4 border-white shadow-lg" // Changed from object-cover to object-contain
          />
        </div>
    
        {/* Profile Info */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold l-color">{item.firstName}</h2>
          <button 
                onClick={goToMyBlogs} 
                className="mt-5 px-4 py-2  text-white rounded-lg l-gray-bg hover:bg-[#586155] "
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









