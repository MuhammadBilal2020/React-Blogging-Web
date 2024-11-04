import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"; // Import setDoc and doc
import { auth, db } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';

function Register() {
  let firstName = useRef();
  let lastName = useRef();
  let email = useRef();
  let password = useRef();
  let profileImage = useRef();
  let navigate = useNavigate();
  const storage = getStorage();

  // Function to upload image and return URL
  async function showUrl(files) {
    const storageRef = ref(storage, email.current.value);
    try {
      const uploadImg = await uploadBytes(storageRef, files);
      const url = await getDownloadURL(storageRef);
      return url;
    } catch (error) {
      console.error(error);
    }
  }

  // Register function
  async function signUpUserAndSaveUserData(event) {
    event.preventDefault();
    const profilePic = await showUrl(profileImage.current.files[0]);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
      const user = userCredential.user;

      // Add user data to Firestore
      await addDoc(collection(db, "users"), {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        uid: user.uid,
        userPic: profilePic
      });

      Swal.fire({
        text: "You are registered",
        icon: "success"
      }).then(() => {
        window.location.reload();
      });

      // Sign out after registration
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  // JSX 
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form id="forms" onSubmit={signUpUserAndSaveUserData} className='shadow-md l-bg py-6 px-4 rounded-xl mt-10 max-w-sm w-full text-center'>
          <h1 className='text-center text-2xl mb-4'>Register</h1>

          {/* First Name */}
          <input
            type="text"
            ref={firstName}
            required
            className="py-2 border w-full block px-3 mt-2 text-center rounded-md"
            placeholder="First Name"
          />

          {/* Last Name */}
          <input
            type="text"
            ref={lastName}
            required
            className="py-2 border w-full block px-3 mt-2 text-center rounded-md"
            placeholder="Last Name"
          />

          {/* Email */}
          <input
            type="email"
            ref={email}
            required
            className="py-2 border w-full block px-3 mt-2 text-center rounded-md"
            placeholder="Email"
          />

          {/* Password */}
          <input
            type="password"
            ref={password}
            required
            className="py-2 border w-full block px-3 mt-2 text-center rounded-md"
            placeholder="Password"
          />

          {/* Profile Image */}
          <input
            type="file"
            ref={profileImage}
            required
            className="py-2 border bg-white w-full block px-3 mt-2 text-center rounded-md"
          />

          {/* Already registered? */}
          <Link to="/" className='block mt-4 hover:text-[#697565] text-lg'>
            Already registered? Login
          </Link>

          {/* Register Button */}
          <button
            type="submit"
            className="py-2 rounded-md l-color black-bg hover:bg-[#8b65f1] w-full mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
