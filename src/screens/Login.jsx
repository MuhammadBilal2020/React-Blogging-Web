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
        <div className="reg-form-style shadow-md l-bg   py-[1rem] px-[1.5rem] rounded-xl mt-[6rem] flex items-center justify-center text-center">
          <form id="forms" onSubmit={signInUser}>
            <h1 className='text-center  text-[2rem]'>Login</h1>

            {/* email  */}
            <input
              type="email"
              ref={email}
              required
              className="py-[.4rem] border w-[20rem] px-[.6rem] mt-[1rem] text-center"
              placeholder=" Email"
            />
            <br /> <br />

            {/* password  */}
            <input
              type="password"
              className="py-[.4rem] border w-[20rem] px-[.6rem] text-center"
              ref={password}
              placeholder=" Password"
              required


            />
            <br /> <br />

            {/* go to register  */}
            <Link to="register" className='block  hover:text-[#697565] text-[1.2rem]'>!Register first , if not a user </Link>
            <br />
            {/* submit btn  */}
            <button
              type="submit"
              className="logins  py-[.5rem] rounded-md l-color black-bg hover:bg-[#8b65f1]  w-[6rem] px-[.8rem]  "
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