import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged     } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { auth } from '../firebaseConfig/firebaseMethod';


function ProtectedRoutes({component}) {
    let [user , setUser] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(true)
              const uid = user.uid;
              // ...
            } else {
              navigate('/login')
            }
          });
    } ,[])
  return (
<>
{setUser ? component : <h1>..loading</h1>}

</>
  )
}

export default ProtectedRoutes