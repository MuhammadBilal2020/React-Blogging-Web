import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { auth } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';

function Login() {
  let email = useRef();
  let password = useRef();
  let navigate = useNavigate();

  // Sign in function 
  function signInUser(event) {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;

        Swal.fire({
          text: "Login successfully",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });

        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  // JSX 
  return (
    <>
      <div className="flex  justify-center  bg-gray-100">
        <div className="reg-form-style shadow-md l-bg py-6 px-4 rounded-xl mt-[8rem] max-w-sm w-full">
          <form id="forms" onSubmit={signInUser}>
            <h1 className='text-center text-2xl mb-4'>Login</h1>

            {/* Email Input */}
            <input
              type="email"
              ref={email}
              required
              className="py-2 border w-full px-3 mt-2 text-center rounded-md"
              placeholder="Email"
            />
            <br /> <br />

            {/* Password Input */}
            <input
              type="password"
              ref={password}
              required
              className="py-2 border w-full px-3 text-center rounded-md"
              placeholder="Password"
            />
            <br /> <br />

            {/* Go to Register */}
            <Link to="register" className='block text-center hover:text-[#697565] text-lg'>
              !Register first, if not a user
            </Link>
            <br />

            {/* Submit Button */}
            <button
              type="submit"
              className="py-2 rounded-md l-color black-bg hover:bg-[#8b65f1] w-full mt-4"
            >
              Login
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
