import { Link } from "react-router";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <Link to="/">Satyam Tiwari</Link>
      </div>
      <div className="header-links-sec">
        <Link to="/">Home</Link>
        <Link to="/todo">Todo</Link>
        <Link to="/rotate">Rotate</Link>
        <Link to="/utils">Utils</Link>
      </div>
    </div>
  );
};

export default Header;
