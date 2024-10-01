import React, { useEffect, useRef, useState } from 'react';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig/firebaseMethod';
import Swal from 'sweetalert2';

function Dashboard() {

  let navigate = useNavigate();
  let title = useRef();
  let description = useRef();

  let [blogArr, setBlogArr] = useState([]);
  let [userUid, setUserUid] = useState(null);
  let [pic, setPic] = useState(null);
  let [username, setUsername] = useState(null);
  let [docId, setDocId] = useState("");

  async function getDataFromFirestore() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserUid(user.uid);

        const q = query(collection(db, "users"), where("uid", "==", uid));
        const usersSnapshot = await getDocs(q);
        usersSnapshot.forEach((doc) => {
          setPic(doc.data().userPic);
          setUsername(doc.data().firstName);
        });

        const q2 = query(collection(db, "Blogs"), where("uid", "==", uid));
        const blogsSnapshot = await getDocs(q2);
        let Blogs = [];
        blogsSnapshot.forEach((doc) => {
          Blogs.push({ ...doc.data(), id: doc.id });
          setDocId(doc.id);
        });

        setBlogArr(Blogs);
      } else {
        console.log("no data");
      }
    });
  }

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  async function addBlog(event) {
    event.preventDefault();

    const docRef = await addDoc(collection(db, "Blogs"), {
      title: title.current.value,
      description: description.current.value,
      uid: userUid,
      pic: pic,
      name: username,
      id: docId
    });

    Swal.fire({
      title: "Good job!",
      text: "Blog successfully added!",
      icon: "success"
    }).then(() => {
      window.location.reload();
    });
  }

  async function deleteBlog(index, id) {
    blogArr.splice(index, 1);
    setBlogArr([...blogArr]);

    Swal.fire({
      text: "Blog successfully deleted!",
      icon: "success"
    });

    await deleteDoc(doc(db, "Blogs", id));
  }

  const updatedata = async (id) => {
    const updatedTitle = prompt("Enter Updated Title");
    const updateddescription = prompt("Enter Updated Description");

    if (updatedTitle && updateddescription) {
      const blogRef = doc(db, "Blogs", id);
      await updateDoc(blogRef, {
        title: updatedTitle,
        description: updateddescription
      });

      const updatedBlogs = blogArr.map(blog =>
        blog.id === id ? { ...blog, title: updatedTitle, description: updateddescription } : blog
      );
      setBlogArr(updatedBlogs);

      Swal.fire({
        title: "Success!",
        text: "Blog updated successfully.",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Title and description are required!",
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className="l-bg l-color shadow-md w-full max-w-4xl mt-8 mx-auto py-4 px-8 md:px-16">
        <h2 className="form-title text-2xl text-center">Create a New Blog Post</h2>
        <form className="form" onSubmit={addBlog}>
          <input
            type="text"
            className="text-lg border border-gray-400 p-3 w-full rounded-lg mx-auto mt-6"
            ref={title}
            placeholder="Title"
            name="title" />
          <textarea
            className="mt-6 border border-gray-400 text-lg w-full rounded-lg block mx-auto p-3"
            placeholder="Description"
            name="description"
            ref={description}
            rows="4"
          ></textarea>
          <button type="submit" className="publish-button mt-6 black-bg hover:bg-[#8b65f1] l-color w-full py-3 rounded-lg">Publish Blog</button>
        </form>
      </div>

      <div className="my-8 px-4 md:px-8">
        {blogArr && blogArr.map((item, index) => (
          <div className="max-w-4xl border border-gray-300 p-6 mx-auto l-bg shadow-lg rounded-lg overflow-hidden mt-6" key={index}>
            <div className="flex items-center space-x-4">
              <img src={item.pic} className="h-20 md:w-16 md:h-16 xsm:w-12 xsm:h-12 w-20 object-cover rounded-full shadow-lg" alt="Profile" />
              <p className="text-lg font-semibold capitalize text-gray-800">{item.name}</p>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-black">{item.title}</h2>
              <p className="text-lg mt-2">{item.description}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => deleteBlog(index, item.id)}
                  className="black-color hover:text-[#9f81f3] font-bold">Delete</button>
                <button
                  onClick={() => updatedata(item.id)}
                  className="black-color hover:text-[#9f81f3] font-bold">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
