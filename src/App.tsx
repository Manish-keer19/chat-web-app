import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/Login";
import HomePage from "./Component/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import SimpleMessageUI from "./Component/SimpleMessageUI";
import AdvanceMessageUI from "./Component/AdvanceMessageUI";
import Calculator from "./Component/Calculator";
import TodoList from "./Component/TodoList";
import Profile from "./Component/Profile";
import About from "./Component/About";
import SignUp from "./Component/SignUp";
import Portfolio from "./Component/Portfolio";
import NotFound from "./Component/NotFound";

const route = createHashRouter([
  {
    path: "/",
    element: <Login />,
  },
  {},
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/simple-message",
    element: <SimpleMessageUI />,
  },
  {
    path: "/advance-MessageUi",
    element: <AdvanceMessageUI />,
  },
  {
    path: "/calc",
    element: <Calculator />,
  },
  {
    path: "/todos",
    element: <TodoList />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/port",
    element: <Portfolio />,
  },
  {
    path: "*",
    element: <NotFound />,
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
