import React, { useEffect, useState } from 'react';
import { FaShopify, FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db, auth } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';

function Navbar() {
  const [pic, setPic] = useState('');
  const [u, setU] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setU(uid);
      } else {
        setU(null);
      }
    });
  }, []);

  useEffect(() => {
    if (u) {
      const getUserBlogs = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", u));
          const usersSnapshot = await getDocs(q);
          usersSnapshot.forEach((doc) => {
            setPic(doc.data().userPic); // Set user profile picture
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      getUserBlogs();
    }
  }, [u]);

  function signOuts() {
    signOut(auth)
      .then(() => {
        Swal.fire({
          text: "Successfully signed out",
          icon: "success"
        }).then(() => {
          navigate("/login");
          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error during signout:", error);
      });
  }

  return (
    <>
      <div className="navbar black-bg l-color p-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <p className="text-[2rem]"><FaShopify /></p>
          <h1 className="font-bold 2xl-text-[1.9rem] md:text-[1.5rem] sm:text-[1.3rem] text-[1.1rem]">Personal Blogging Website</h1>
        </div>

        <div className="md:hidden">
          <button className='flex items-center' onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
            <FaBars className="text-[1.3rem] 2xl:text-[1.5rem] text-white" />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-5 md:gap-4">
          <Link to="" className="text-[1.4rem] md:text-[1.1rem]">Home</Link>
          {u ? (
            <>
              <Link to="dashboard" className="text-[1.4rem] md:text-[1.1rem]">Dashboard</Link>
              <Link to="profile" className="text-[1.4rem] md:text-[1.1rem]">Profile</Link>
              <button
                className="w-[6rem] black-color md:text-[1rem] l-gray-bg hover:bg-[#6333e8] py-2 px-3 rounded-lg block"
                onClick={signOuts}
              >
                Signout
              </button>

              {/* Profile Picture with Dropdown */}
              <div className="relative">
                <img
                  src={pic}
                  className="w-[4rem] md:w-[3.5rem] h-[4rem] md:h-[3.5rem] rounded-full object-contain l-bg shadow-lg cursor-pointer"
                  alt="Profile"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                />

               
              
              </div>
            </>
          ) : (
            <>
              <Link to="login" className="text-[1.4rem] md:text-[1.1rem]">Login</Link>
              <Link to="register" className="text-[1.4rem] md:text-[1.1rem]">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileDropdownOpen && (
        <div className="md:hidden bg-white py-2">
          <Link to="" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Home</Link>
          {u ? (
            <>
              <Link to="dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link>
              <Link to="profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={signOuts}
              >
                Signout
              </button>
            </>
          ) : (
            <>
              <Link to="login" className="block  md:text-[1.1rem] px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link>
              <Link to="register" className="block  px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
