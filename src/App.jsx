import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Home } from './pages/Home';
import { Pricing } from './pages/Pricing';
import { Navbar } from './components/Navbar';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ErrorPage } from './pages/404';
import { Dashboard } from './pages/Dashboard';
import { CreateSubject } from './pages/CreateSubject';
import { Subject } from './pages/Subject';
import { CreatePaperPattern } from './pages/CreatePaperPattern';
import { PaperUpload } from './pages/PaperUpload';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "pricing",
          element: <Pricing />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "about",
          element: <About />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
          element: <CreateSubject />,
        },
        {
          path: "create-subject",
          element: <CreateSubject />,
        },
        {
          path: "subject/:name",
          element: <Subject />,
        },
        {
          path: "subject/:name/create-paper-pattern",
          element: <CreatePaperPattern />,
        },
        {
          path: "subject/:name/paper-upload/:title",
          element: <PaperUpload />,
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ]);

  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={router} />
    </>
  )
}


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
