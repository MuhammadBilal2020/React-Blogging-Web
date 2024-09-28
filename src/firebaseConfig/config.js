import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD1WUXxVp626NC-AQ6owZJ30Gwvcfcn0L4",
  authDomain: "react-blogging-website-31666.firebaseapp.com",
  projectId: "react-blogging-website-31666",
  storageBucket: "react-blogging-website-31666.appspot.com",
  messagingSenderId: "86065987776",
  appId: "1:86065987776:web:265fd1197fd816a90eed25",
  measurementId: "G-XXNE3J0C5E"
};


export const app = initializeApp(firebaseConfig);

