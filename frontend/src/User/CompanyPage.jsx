import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/CompanyPage.css";
import CompanyProjects from "../components/Home/CompanyProjects";

const services = [
  {
    title: "Cybersecurity",
    description:
      "Protect your digital assets with cutting-edge security protocols, threat detection, and risk mitigation strategies."
  },
  {
    title: "Software Development",
    description:
      "Build tailored software solutions for your enterprise needs, combining functionality with performance."
  },
  {
    title: "Android Development",
    description:
      "Launch intuitive and high-performance Android applications to reach your mobile audience."
  },
  {
    title: "Website Development",
    description:
      "Craft visually appealing, responsive, and SEO-friendly websites for your business."
  },
  {
    title: "SEO",
    description:
      "Boost your visibility and rank higher in search engines with our expert SEO strategies."
  },
  {
    title: "Digital Marketing",
    description:
      "Grow your brand through targeted campaigns, content strategy, and data-driven marketing."
  }
];

const CompanyPage = () => {
  return (
    <div className="company-page">
      {/* Hero Section */}
<section className="hero-section text-white py-5 position-relative" style={{ border: "none" }}>
  <Container  className="h-100">
    <Row className="align-items-center h-100 flex-column-reverse flex-md-row px-3">
      
      {/* Left Side Content */}
      <Col md={6} className="text-center text-md-start">
        <motion.h1
          className="display-4 fw-bold"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Empowering <span className="extra">Digital Excellence</span>
        </motion.h1>

        <motion.p
          className="lead my-3"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          We craft innovative solutions using cutting-edge technology to help businesses thrive in the digital era.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: false, amount: 0.3 }}
        >
        
        </motion.div>
      </Col>

      {/* Right Side Image with Continuous Motion */}
      <Col md={6} className="text-center mb-4 mb-md-0">
        <motion.img
          src="/company.png"
          alt="Company"
          className="img-fluid"
          style={{height: "auto" }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </Col>
    </Row>
  </Container>

  {/* SVG Divider at Bottom */}
  <div className="custom-shape-divider-bottom-1751006726">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "60px" }}
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,
        82.39-16.72,168.19-17.73,250.45-.39,
        C823.78,31,906.67,72,985.66,92.83,
        c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35,
        A600.21,600.21,0,0,0,321.39,56.44Z"
        className="shape-fill"
        fill="#fff" // Ensure SVG path doesn't look like a border
      />
    </svg>
  </div>
</section>


      {/* Services Section */}
      <section className="services-section py-5 bgsection2">
        <Container>
          <motion.h2
            className="text-center section-title"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            What <span className="extra">We Offer</span>
          </motion.h2>
          <Row>
            {services.map((service, index) => (
              <Col
                md={6}
                lg={3}
                key={index}
                className="mb-4 d-flex justify-content-center"
              >
                <motion.div
                  className="animated-card"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <div className="card-title text-danger">{service.title}</div>
                  <div className="card-description">{service.description}</div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      
      {/* About Us Section */}
<section className="about-us-section py-5 bgsection">
  <Container>
    <motion.h2
      className="text-center section-title mb-5"
      initial={{ y: -50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Why Choose <span className="extra">Code Master Technology</span>
    </motion.h2>

    <Row className="align-items-center">
      {/* Left Image with Full Motion */}
      <Col md={6} className="mb-4 mb-md-0">
        <motion.div
          className="w-100"
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src="/benefits.png"
            alt="Benefits"
            className="img-fluid "
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </motion.div>
      </Col>

      {/* Right Key Benefits */}
      <Col md={6}>
        <motion.ul
          className="list-unstyled fs-5"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <li className="mb-3">🚀 <strong>Fast & Reliable Delivery:</strong> We commit to timelines without compromising quality.</li>
          <li className="mb-3">🎯 <strong>Client-Centric Approach:</strong> Every product is crafted with your vision at its core.</li>
          <li className="mb-3">🛡️ <strong>Security-First Development:</strong> Our systems are built with top-tier security practices.</li>
          <li className="mb-3">💡 <strong>Innovative Solutions:</strong> We leverage the latest tech to solve modern challenges.</li>
          <li className="mb-3">🤝 <strong>End-to-End Support:</strong> From ideation to post-launch, we’ve got your back.</li>
        </motion.ul>
      </Col>
    </Row>
  </Container>

  <div className="svg-divider-top"></div>
</section>





      {/* Clients Section */}
      <section className="clients-section py-5">
        <Container>
          <motion.h2
            className="text-center section-title"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Trusted <span className="extra">By Industry</span>
          </motion.h2>
          <CompanyProjects />
        </Container>
      </section>
    </div>
  );
};

export default CompanyPage;
