import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



// All Pages 
import Layout from './Layout.jsx'
import Login from './screens/Login.jsx'
import Register from './screens/Register.jsx'
import Home from './screens/Home.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import Dashboard from './screens/Dashboard.jsx'
import Profile from './screens/Profile.jsx'
import SingleUser from './screens/SingleUserProfile.jsx'
import SingleUserBlogs from './screens/SingleUserBlogs.jsx'
import MyBlogs from './screens/MyBlogs.jsx'


const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'profile',
        element: <ProtectedRoutes component={<Profile />} />
      },
      {
        path: 'myBlogs',
        element: <ProtectedRoutes component={<MyBlogs />} />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoutes component={<Dashboard />} />
      },
      {
        path: "singleUser/:uid",
        element: <SingleUser />
      },
      {
        path: "singleUserBlogs/:uid",
        element: <SingleUserBlogs />
      }
 
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <>

    <RouterProvider router={router}>
      <App />
    </RouterProvider>

  </>

)
