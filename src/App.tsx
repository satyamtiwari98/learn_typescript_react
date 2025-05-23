import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Shared/Header/Header";
import Footer from "./components/Shared/Footer/Footer";
import Todo from "./components/Todo/Todo";
import Rotate from "./components/Rotate/Rotate";
import Utils from "./components/Utils/Utils";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/todo",
      element: <Todo />,
    },
    {
      path: "/rotate",
      element: <Rotate />,
    },
    {
      path: "/utils",
      element: <Utils />,
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <div className="inner-container">
        <Routes>
          {routes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
