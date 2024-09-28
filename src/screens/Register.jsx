import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

import { auth, db } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';


function Register() {

  let firstName = useRef()
  let lastName = useRef()
  let email = useRef()
  let password = useRef()
  let profileImage = useRef()

  let navigate = useNavigate()
  const storage = getStorage();

  //  make image url function 
  async function showUrl(files) {
    const storageRef = ref(storage, email.current.value);

    try {
      console.log(files);
      const uploadImg = await uploadBytes(storageRef, files);
      console.log(uploadImg);
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url;
    }

    catch (error) {
      console.error(error);

    }

  }


  // register function 
  async function signUpUserAndSaveUserData(event) {
    event.preventDefault();

    const profilePic = await showUrl(profileImage.current.files[0]);
    console.log(profilePic);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);

      const user = userCredential.user;
      console.log(user.uid);

      // Add user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        uid: user.uid,
        userPic: profilePic
      });

      Swal.fire({
        
        text: "You are register",
        icon: "success"
      }).then(() => {
       
        window.location.reload();
      });
      // signout after register 
      await signOut(auth);
      // Redirect to login page
      navigate("/login");
    }

    catch (e) {
      console.log(e);
    }

  }


// JSX 
  return (
    <>
      <div className="reg-form-style   flex items-center justify-center text-center">
        <form id="forms" onSubmit={signUpUserAndSaveUserData} className='black-bg py-[1rem] px-[1.7rem] mt-5 p-[2rem] rounded-xl'>
          <h1 className='text-center l-color text-[2rem]'>Register</h1>

          {/* first Name  */}
          <input
            type="text"
            ref={firstName}
            className="py-[.4rem] w-[20rem] block px-[.6rem] mt-[1.4rem] text-center"
            placeholder=" First Name"
          />

          {/* Last Name  */}
          <input
            type="text"
            ref={lastName}
            className="py-[.4rem] w-[20rem] px-[.6rem] block mt-[1.4rem] text-center"
            placeholder=" Last Name"
          />

          {/* Email  */}
          <input
            type="email"
            ref={email}
            className="py-[.4rem] w-[20rem] px-[.6rem] block mt-[1.4rem] text-center"
            placeholder=" Email"
          />

          {/* Password  */}
          <input
            type="password"
            className="py-[.4rem]  w-[20rem] px-[.6rem] block mt-[1.4rem] text-center"
            ref={password}
            placeholder=" Password"
          />

          <input
            type="file"
            required
            ref={profileImage}
            className="py-[.3rem] bg-white w-[20rem] block px-[.6rem] mt-[1.4rem] text-center"
          />

          {/* Photo  */}
          <Link to="/" className='block mt-[1.4rem] l-color hover:text-[#697565] text-[1.2rem]'>!Register first , if not a user </Link>
          <br />

          {/* Register button  */}
          <button
            type="submit"
            className="logins hover:bg-[#3C3D37]  py-[.5rem] rounded-md   w-[6rem] px-[.8rem] l-color l-gray-bg"
          >
            Register
          </button>
          <br /> <br />

        </form>
      </div>

    </>

  )
}

export default Register