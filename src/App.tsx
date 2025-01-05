import { createHashRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./Component/Login";
import MessengerUI from "./Component/MessengerUI";
import HomePage from "./Component/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import UserDetail from "./Component/UserDetail";
import UserFullDetail from "./Component/UserFullDetail";

const route = createHashRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/chat",
    element: <MessengerUI />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/users",
    element: <UserDetail />,
  },
  {
    path: "/UserFullDetail",
    element: <UserFullDetail />,
  },
 
]);

function App() {
  return (
    <Provider store={store}>
      <div className="text-white  min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
        <RouterProvider router={route}></RouterProvider>
        <Toaster />
      </div>
    </Provider>
  );
}

export default App;
