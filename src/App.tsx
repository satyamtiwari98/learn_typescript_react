import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Header from "./components/Shared/Header/Header";
import Footer from "./components/Shared/Footer/Footer";

const App = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/todo",
      element: "",
    },
    {
      path: "/rotate",
      element: "",
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
