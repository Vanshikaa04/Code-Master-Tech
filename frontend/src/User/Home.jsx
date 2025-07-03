import { useState } from "react";
import StudentProjects from "../components/Home/StudentProjects";
import { Nav, Container, Button } from "react-bootstrap";
import CompanyProjects from "../components/Home/CompanyProjects";
import CourseInfo from "../components/Home/CourseInfo";
import Service from "../components/Home/Service";
import Reviews from "../components/Home/Reviews";
import "./css/Home.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Profile from "../components/Home/Profile";
import AboutUs from "../components/Home/AboutUs";
import Video from "../components/Home/Video";

const Home = () => {
  const [activeTab, setActiveTab] = useState("students");
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="home-main d-flex align-items-center w-100 m-0 p-0 position-relative bgsection" style={{ minHeight: "100vh" }}>
        <Container className="w-100 h-100 home-cont">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="content-wrapper text-center text-md-start mb-4 mb-md-0 px-2" style={{ flex: 1 }}>
              <motion.h1
                className="headline mt-5"
                style={{ color: "var(--bgcolor)", fontSize: "2.5rem", fontWeight: "bold" }}
                initial={{ opacity: 0, scale: 1, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false }}
              >
                Creativity starts where syntax ends!
              </motion.h1>

              <motion.p
                className="lead mt-3"
                style={{ color: "var(--bgcolor)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: false }}
              >
                At Code Master Tech, we nurture innovation by turning logic into
                creativity. Dive deep into code, think beyond the screen, and
                build the future you imagine.
              </motion.p>
            </div>

            <div className="image-wrapper text-center px-2" style={{ flex: 1 }}>
              <motion.img
                src="/hero.png"
                alt="Coding Illustration"
                className="img-fluid slow-float"
                style={{ maxHeight: "500px", width: "100%", objectFit: "contain" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
        </Container>

        {/* SVG Divider (hidden on small screens) */}
        <div className="custom-shape-divider-bottom-1751006726 d-none d-md-block">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
              82.39-16.72,168.19-17.73,250.45-.39C823.78,31,
              906.67,72,985.66,92.83c70.05,18.48,146.53,
              26.09,214.34,3V0H0V27.35A600.21,600.21,
              0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="py-5 bgsection2">
        <motion.h1
          className="section-title text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Unlock <span className="extra">Limitless</span> Learning
        </motion.h1>

        <CourseInfo />

        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={() => navigate("/allcourses")} className="mt-3 animate__backInLeft animation">
            Explore More Courses
          </Button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="aboutsect bgsection position-relative">
        {/* Top SVG Divider */}
        <div className="custom-shape-divider-top d-none d-md-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,
              743.84,14.19c-82.26-17.34-168.06-16.33-250.45,
              0.39-57.84,11.73-114,31.07-172,
              41.86A600.21,600.21,0,0,1,0,
              27.35V120H1200V95.8C1132.19,118.92,
              1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <motion.h1
          className="section-title2 text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Behind The <span className="extra">Vision</span>
        </motion.h1>

        <AboutUs />

        {/* Bottom SVG Divider */}
        <div className="custom-shape-divider-bottom d-none d-md-block">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M985.66,92.83C906.67,72,823.78,31,
              743.84,14.19c-82.26-17.34-168.06-16.33-250.45,  
              0.39-57.84,11.73-114,31.07-172,
              41.86A600.21,600.21,0,0,1,0,
              27.35V120H1200V95.8C1132.19,118.92,
              1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-5 bgsection2">
        <motion.h1
          className="section-title text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="extra">Your Growth,</span> Our Expertise
        </motion.h1>

        <Service />

        <div className="d-flex justify-content-center">
          <Button variant="danger" onClick={() => navigate("/company")} className="mt-3 animate__backInLeft animation">
            Explore Our Company
          </Button>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-5 bgsection">
        <motion.h1
          className="section-title text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Meet the People Behind the <span className="extra">Progress</span>
        </motion.h1>
        <Profile />
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects-section py-5 bgsection2">
        <div className="d-flex justify-content-center">
          <Nav variant="pills" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)} className="projects-tabs px-2 py-2 rounded-pill">
            <Nav.Item>
              <Nav.Link eventKey="students" className="custom-pill">Student Projects</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="company" className="custom-pill">Company Projects</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="mt-4">
          {activeTab === "students" && <StudentProjects />}
          {activeTab === "company" && <CompanyProjects />}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-5 bgsection border">
        <Reviews />
      </section>

      {/* VIDEO SECTION */}
      <section className="bgsection2 py-5">
        <Video />
      </section>
    </>
  );
};

export default Home;
