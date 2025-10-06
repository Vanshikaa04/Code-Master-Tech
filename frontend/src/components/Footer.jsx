import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  // Facebook,
  // Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="hero-section text-white  customfooter">
      {/* SVG - Hide on mobile */}
      <div className="custom-shape-divider-top-footer d-none d-md-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
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

      <Container className="footer-container">
        <Row className="mb-4 text-center text-md-start flex-column flex-md-row align-items-center align-items-md-start">
          {/* About */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="footer-title text-warning">About Us</h5>
            <p style={{ color: "var(--textcolor)" }}>
              Code Master Technology is a leading tech education provider offering industry-relevant training,
              real-world projects, and internship opportunities to prepare learners for the digital workforce.
            </p>
          </Col>

          {/* Quick Links */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="footer-title text-warning">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/allcourses")}>Courses</li>

              <li onClick={() => navigate("/company")}>Company</li>
              <li onClick={() => navigate("/college")}>Internships</li>
              <li onClick={() => navigate("/blog")}>Blogs</li>
            </ul>
          </Col>

          {/* Contact / Social */}
          <Col xs={12} md={4} className="mb-3">
            <h5 className="footer-title text-warning">Connect With Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              {/* <Facebook size={24} /> */}
              {/* <Twitter size={24} /> */}
              <a href="https://www.instagram.com/code_master_technology?igsh=MXE4NDR4YXByaDIwZA==" className="text-white">
              <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/code-master-technology/" className="text-white">

              <Linkedin size={24} />
              </a>
            </div>
            <p className="mt-3"><Mail/>    codemastertech7@gmail.com</p>
            <p className="mt-3"><Phone/>   8200588263</p>
            <p className="mt-3"><MapPin/> F-101  below Shanti Hospital  Damodar Complex, Idar Gujarat 383430</p>


          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row>
          <Col className="text-center small">
            © {new Date().getFullYear()} CodeMaster Technology. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
