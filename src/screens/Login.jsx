import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// imports from firebase 
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { auth } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';



function Login() {
  let email = useRef()
  let password = useRef()
  let navigate = useNavigate()

  // sign in function 
  function signInUser(event) {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)

      .then((userCredential) => {
        const user = userCredential.user;

        Swal.fire({
          text: "login successfully",
          icon: "success"
        }).then(() => {      
          window.location.reload();
        });

        navigate("/dashboard")
      })

      .catch((error) => {

        const errorMessage = error.message;
        console.log(errorMessage);

      });

  }



  // JSX 
  return (
    <>

      <div className="index-form-style flex items-center justify-center ">
        <div className="reg-form-style   black-bg py-[1rem] px-[1.5rem] rounded-xl mt-5 flex items-center justify-center text-center">
          <form id="forms" onSubmit={signInUser}>
            <h1 className='text-center l-color text-[2rem]'>Login</h1>

            {/* email  */}
            <input
              type="email"
              ref={email}
              className="py-[.4rem] w-[20rem] px-[.6rem] mt-[1rem] text-center"
              placeholder=" Email"
            />
            <br /> <br />

            {/* password  */}
            <input
              type="password"
              className="py-[.4rem] w-[20rem] px-[.6rem] text-center"
              ref={password}
              placeholder=" Password"

            />
            <br /> <br />

            {/* go to register  */}
            <Link to="register" className='block l-color hover:text-[#697565] text-[1.2rem]'>!Register first , if not a user </Link>
            <br />
            {/* submit btn  */}
            <button
              type="submit"
              className="logins  py-[.5rem] rounded-md hover:bg-[#3C3D37]   w-[6rem] px-[.8rem] l-color l-gray-bg"
            >
              Login
            </button>
            <br /> <br />

          </form>
        </div>
      </div>

    </>

  )
}

export default Login