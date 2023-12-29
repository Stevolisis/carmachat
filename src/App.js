import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddPackage from "./pages/add_package";
import AddService from "./pages/add_service";
import Bookings from "./pages/bookings";
import Chatroom from "./pages/chatroom";
import CustomerSupport from "./pages/customer_support";
import Dashboard from "./pages/dashboard";
import LogIn from './pages/login';
import OpenTicket from "./pages/open_ticket";
import Register from './pages/register';
import Service from "./pages/service";
import Services from "./pages/services";
import StaffDashboard from "./pages/staff_dashboard";
import StaffLogIn from "./pages/staff_login";
import StaffPackages from "./pages/staff_packages";
import StaffRegister from "./pages/staff_register";
import StaffServices from "./pages/staff_services";
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
      path: "/chatroom",
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
      path: "/staff_services",
      element: <StaffServices />,
    },
    {
      path: "/add_service",
      element: <AddService />,
    },
    {
      path: "/staff_packages",
      element: <StaffPackages />,
    },
    {
      path: "/add_package",
      element: <AddPackage />,
    },
    {
      path: "/services",
      element: <Services />,
    },
    {
      path: "/service/:id",
      element: <Service />,
    },
    {
      path: "/bookings",
      element: <Bookings />,
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
