import { motion } from "framer-motion";
import React from "react";
import "../css/About.css";
import img1 from "../../assets/images/ChatGPT_Image_Jun_30__2025__04_56_25_PM-removebg-preview.png";

const AboutUs = () => {
  return (
    <>
    
      <div className="animated-dots-wrapper">
        {[...Array(30)].map((_, i) => {
          const size = Math.floor(Math.random() * 6) + 4;
          const color =
            Math.random() > 0.5
              ? "rgba(36, 3, 78, 0.9)"
              : "rgba(100, 200, 255, 0.9)";
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 10 + 10;

          return (
            <span
              key={i}
              className="animated-dot"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                left: `${left}%`,
                top: `${top}%`,
                animationDuration: `${duration}s`,
              }}
            />
          );
        })}
      </div>

      <div className="container m-0 p-0">
        <div className="row align-items-center">
          {/* Left SVG Section */}
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <motion.img
              src={img1}
              alt="Creative Work"
              className="img-fluid w-75"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            />
          </div>

          {/* Right Content */}
          <div className="col-md-6 ">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p className="">
                We are a dynamic and forward-thinking organization offering a
                diverse range of learning and digital solutions. Our mission is
                to empower individuals and businesses with:
              </p>
              <ul className=" ps-3">
                <li>
                  <strong>Industry-ready courses</strong> in tech, business, and
                  design
                </li>
                <li>
                  <strong>Interactive e-learning programs</strong> – both online
                  and offline
                </li>
                <li>
                  <strong>Professional services</strong> through our in-house
                  company projects and solutions
                </li>
              </ul>
              <p className="mt-3">
                With a talented team of educators, developers, and creators, we
                combine education with execution — transforming learners into
                leaders, and ideas into impact.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
