import React from "react";
import Booking from "./components/Booking";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Welcome from "./components/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/booking",
    element: <Booking />
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
