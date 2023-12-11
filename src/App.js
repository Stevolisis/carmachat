import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatroom from "./pages/chatroom";
import Dashboard from "./pages/dashboard";
import LogIn from './pages/login';
import Register from './pages/register';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/chatroom/:room",
      element: <Chatroom />,
    },
    {
      path: "*",
      element: <p>There's nothing here: 404!</p>,
    },
  ]);
  
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
