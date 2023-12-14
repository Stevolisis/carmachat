import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatroom from "./pages/chatroom";
import CustomerSupport from "./pages/customer_support";
import Dashboard from "./pages/dashboard";
import LogIn from './pages/login';
import Register from './pages/register';
import StaffDashboard from "./pages/staff_dashboard";
import StaffLogIn from "./pages/staff_login";
import StaffRegister from "./pages/staff_register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/staff_login",
      element: <StaffLogIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/staff_register",
      element: <StaffRegister />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard",
      element: <StaffDashboard />,
    },
    {
      path: "/chatroom/:id",
      element: <Chatroom />,
    },
    {
      path: "/customer_support",
      element: <CustomerSupport />,
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
