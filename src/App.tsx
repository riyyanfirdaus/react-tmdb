import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorite, Home, MovieDetail, Watchlist } from "./pages";
import { PrivateRoute } from "./components/layout";
import ShowProvider from "./contexts/showContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ShowProvider>
          <Home />
        </ShowProvider>
      ),
    },
    {
      path: "/movie/:id",
      element: (
        <ShowProvider>
          <MovieDetail />
        </ShowProvider>
      ),
    },
    {
      path: "/favorite",
      element: <PrivateRoute />,
      children: [
        {
          path: "/favorite",
          element: (
            <ShowProvider>
              <Favorite />
            </ShowProvider>
          ),
        },
      ],
    },
    {
      path: "/watchlist",
      element: <PrivateRoute />,
      children: [
        {
          path: "/watchlist",
          element: (
            <ShowProvider>
              <Watchlist />
            </ShowProvider>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <h1>404 Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
