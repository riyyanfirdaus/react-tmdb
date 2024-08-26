import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorite, Home, MovieDetail, Watchlist } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/movie/:id",
      element: <MovieDetail />
    },
    {
      path: "/favorite",
      element: <Favorite />,
    },
    {
      path: "/watchlist",
      element: <Watchlist />,
    },
    {
      path: "*",
      element: <h1>404 Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
