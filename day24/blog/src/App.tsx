import AddBlog from "./pages/AddBlog.tsx";
import Blog from "./pages/Blog.tsx";
import Blogs from "./pages/Blogs.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Blogs />,
  },
  {
    path: "/add",
    element: <AddBlog />,
  },
  {
    path: "/blog",
    element: <h1>No id</h1>,
  },
  {
    path: "/blog/:blogId",
    element: <Blog />,
  },
]);

//create router here

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
