import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatroom from "./pages/chatroom";
import CustomerSupport from "./pages/customer_support";
import Dashboard from "./pages/dashboard";
import LogIn from './pages/login';
import OpenTicket from "./pages/open_ticket";
import Register from './pages/register';
import StaffDashboard from "./pages/staff_dashboard";
import StaffLogIn from "./pages/staff_login";
import StaffRegister from "./pages/staff_register";
import TicketInfo from "./pages/ticket_info";
import TicketInfo2 from "./pages/ticket_info2";
import TicketReplies from "./pages/ticket_replies";
import TicketReplies2 from "./pages/ticket_replies2";

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
      path: "/staff_dashboard",
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
      path: "/open_ticket",
      element: <OpenTicket />,
    },
    {
      path: "/ticket_info/:id",
      element: <TicketInfo />,
    },
    {
      path: "/ticket_info2/:id",
      element: <TicketInfo2 />,
    },
    {
      path: "/ticket_replies/:id",
      element: <TicketReplies />,
    },
    {
      path: "/ticket_replies2/:id",
      element: <TicketReplies2 />,
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
