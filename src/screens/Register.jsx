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
        <form id="forms" onSubmit={signUpUserAndSaveUserData} className='shadow-md l-bg   py-[1rem] px-[1.5rem] rounded-xl mt-[3rem] text-center'>
          <h1 className='text-center  text-[2rem]'>Register</h1>

          {/* first Name  */}
          <input
            type="text"
            ref={firstName}
            required
            className="py-[.4rem] border w-[20rem] block px-[.6rem] mt-[1rem] text-center"
            placeholder=" First Name"
          />

          {/* Last Name  */}
          <input
            type="text"
            ref={lastName}
            required
            className="py-[.4rem] border w-[20rem] px-[.6rem] block mt-[1rem] text-center"
            placeholder=" Last Name"
          />

          {/* Email  */}
          <input
            type="email"
            ref={email}
            required
            className="py-[.4rem] border w-[20rem] px-[.6rem] block mt-[1rem] text-center"
            placeholder=" Email"
          />

          {/* Password  */}
          <input
            type="password"
            className="py-[.4rem] border  w-[20rem] px-[.6rem] block mt-[1rem] text-center"
            ref={password}
            placeholder=" Password"
            required
          />

          <input
            type="file"
            required
            ref={profileImage}
            className="py-[.3rem] border bg-white w-[20rem] block px-[.6rem] mt-[1rem] text-center"
          />

          {/* Photo  */}
          <Link to="/" className='block mt-[1rem]  hover:text-[#697565] text-[1.2rem]'>already register, then login </Link>
          <br />

          {/* Register button  */}
          <button
            type="submit"
            className="logins black-bg hover:bg-[#8b65f1] py-[.5rem] rounded-md   w-[6rem] px-[.8rem] l-color "
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