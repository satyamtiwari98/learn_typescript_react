import "./Home.css";
import logo from "../../assets/images/Satyam_Datt_Tiwari_Photo.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-title-sec">
        <h1 className="home-title-sec-h1">Satyam Tiwari</h1>
        <img className="home-logo" src={logo} alt="Logo" />
      </div>
      <h2>About</h2>
      <div className="home-about-sec">
        <div>
          <h6 className="home-about-sec-h6">
            I can turn your ideas into reality.
          </h6>
          <p className="home-about-sec-p">
            I am passionate about crafting innovative software solutions using
            the latest technologies. With expertise in the MERN stack - MongoDB,
            Express.js, React, and Node.js - I thrive on building scalable,
            efficient, and robust applications tailored to meet our clients'
            unique needs.
          </p>
        </div>
        <div>
          <h6 className="home-about-sec-h6">I’m currently working on:</h6>
          <p className="home-about-sec-p">
            As a dedicated software developer, I am actively engaged in
            elevating my expertise in the MERN stack - MongoDB, Express.js,
            React, and Node.js. Through hands-on projects, continuous learning,
            and exploration of best practices, I am committed to mastering each
            component of this powerful technology stack.
          </p>
        </div>
      </div>
      <div className="home-projects-sec">
        <div>
          <h4>Projects</h4>
        </div>
        <div>projects list</div>
      </div>
    </div>
  );
};

export default Home;
