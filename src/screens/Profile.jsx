import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebaseConfig/firebaseMethod';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, doc, getDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"; 
import { useNavigate } from 'react-router-dom'; 
import { CiEdit } from "react-icons/ci"; 

function Profile() { 
  const [profileData, setProfileData] = useState([]); 
  const [editUser, setEditUser] = useState(false); 
  const oldPassword = useRef(null); 
  const newPassword = useRef(null); 
  const repeatPassword = useRef(null); 
  const [title, setTitle] = useState(''); 
  const [userUid, setUserUid] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => { 
    const getDataFromFirestore = async () => { 
      onAuthStateChanged(auth, async (user) => { 
        if (user) { 
          const uid = user.uid; 
          const q = query(collection(db, "users"), where("uid", "==", uid)); 
          const usersSnapshot = await getDocs(q); 
          let userOne = []; 

          if (!usersSnapshot.empty) {
            usersSnapshot.forEach((doc) => { 
              userOne.push({ ...doc.data(), id: doc.id });
              setUserUid(doc.data().uid); 
              setFormData({
                name: doc.data().firstName || '',
                email: doc.data().email || '',
              });
            });
          }
          setProfileData(userOne); 
        } else { 
          console.log("No user is signed in."); 
        } 
      });
    };

    getDataFromFirestore(); 
  }, []);

  const goToMyBlogs = () => { 
    navigate('/myBlogs'); 
  }

  const profileUpdate = async (event) => {
    event.preventDefault();
    const oldPass = oldPassword.current.value;
    const newPass = newPassword.current.value;
    const repeatPass = repeatPassword.current.value;

    if (!oldPass || !newPass || !repeatPass) {
      alert("All fields are required.");
      return;
    }

    if (newPass !== repeatPass) {
      alert("New password and confirmation do not match.");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, oldPass);
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPass);
        alert("Password updated successfully.");
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          alert("The old password is incorrect.");
        } else if (error.code === 'auth/invalid-credential') {
          alert("Invalid credentials. Please check your email and password.");
        } else {
          alert("Error updating password: " + error.message);
        }
      }
    } else {
      alert("User not found. Please log in again.");
    }
  }

  return ( 
    <> 
      <div className="text-center bg-gray-200 py-6">
        <h1 className="text-3xl font-bold text-blue-600">Profile</h1> 
      </div>

      {profileData.length > 0 ? profileData.map((item, index) => { 
        return ( 
          <div key={index} className="flex justify-center items-center mt-10 px-4"> 
            <div className="bg-white w-full max-w-lg border border-gray-300 shadow-lg rounded-lg p-8">
              <div className="flex justify-center mb-6"> 
                <img 
                  src={item.userPic} 
                  alt="Profile" 
                  className="rounded-full h-40 w-40 object-cover border-4 border-blue-500 shadow-md" 
                /> 
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2"> 
                  {!editUser ? (
                    <h2 className="text-2xl font-semibold text-gray-800">{item.firstName}</h2>
                  ) : (
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-xl font-semibold border border-gray-300 p-1 rounded-md focus:outline-none"
                    />
                  )}
                  <button onClick={() => setEditUser(!editUser)}>
                    <CiEdit className="text-2xl text-blue-500 cursor-pointer" />
                  </button> 
                </div>
                <p className="text-gray-600 text-sm">{formData.email}</p>
              </div>

              {/* Password Update Form */}
              <form onSubmit={profileUpdate} className="space-y-4"> 
                <input 
                  type="password" 
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="Old Password" 
                  ref={oldPassword} 
                /> 
                <input 
                  type="password" 
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="New Password" 
                  ref={newPassword} 
                /> 
                <input 
                  type="password" 
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500" 
                  placeholder="Repeat Password" 
                  ref={repeatPassword} 
                /> 
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
                >
                  Update Password
                </button> 
              </form> 
            </div> 
          </div> 
        ); 
      }) : (
        <h1 className="text-center text-lg md:text-xl text-gray-600 mt-10">Loading...</h1>
      )} 
    </> 
  ); 
}

export default Profile;
