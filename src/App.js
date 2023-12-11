import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
      path: "*",
      element: <p>There's nothing here: 404!</p>,
    },
  ]);
  
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App;
