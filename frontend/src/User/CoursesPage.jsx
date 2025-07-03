import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SingleCourses from "../components/CourseComp/SingleCourses";
import FeaturedCourses from "../components/CourseComp/FeaturedCourses";
import DataCourses from "../components/CourseComp/DataCourses";
import DeveloperCourses from "../components/CourseComp/DeveloperCourses";
import ComboCourses from "../components/CourseComp/ComboCourses";
import NonTech from "../components/CourseComp/NonTech";
import "./css/Coursepage.css"; // 👈 import CSS
import { motion } from "framer-motion";

const sections = [
  { id: "basic", label: "Go Basic" },
  { id: "featured", label: "Featured Courses" },
  { id: "data", label: "Playing With Data" },
  { id: "developer", label: "Developer Friendly" },
  { id: "combo", label: "Combos & Frameworks" },
  { id: "noncode", label: "Apart from Programming" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const sidebarLinkVariant = {
  hidden: { opacity: 0, x: -20 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const CoursesPage = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (
          el &&
          el.offsetTop <= scrollPos &&
          el.offsetTop + el.offsetHeight > scrollPos
        ) {
          setActiveSection(sec.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="course-page-wrapper" style={{ backgroundColor: "white" }}>
      {/* Sidebar Navigation */}
      <motion.nav
        className="sidebar"
        style={{ backgroundColor: "var(--bgcolor2)" }}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {sections.map((sec, i) => (
          <motion.a
            key={sec.id}
            href={`#${sec.id}`}
            className={`sidebar-link ${
              activeSection === sec.id ? "active" : ""
            }`}
            variants={sidebarLinkVariant}
            custom={i}
            whileHover={{ scale: 1.05 }}
          >
            {sec.label}
          </motion.a>
        ))}
      </motion.nav>

      {/* Main Content */}
      <div className="course-content">
        <section id="basic" className="text-center ">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            Kick Start <span className="extra"> Your Journey</span>
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <SingleCourses />
          </motion.div>
        </section>

        <section id="featured" className="text-center ">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="extra"> Featured</span> Courses
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <FeaturedCourses />
          </motion.div>
        </section>

        <section id="data" className="text-center">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            Playing With <span className="extra"> Data</span>
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <DataCourses />
          </motion.div>
        </section>

        <section id="developer" className="text-center ">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="extra"> Developer</span> Friendly
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <DeveloperCourses />
          </motion.div>
        </section>

        <section id="combo" className="text-center ">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            <span className="extra">Combos</span> &{" "}
            <span className="extra">FrameWorks</span>
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <ComboCourses />
          </motion.div>
        </section>

        <section id="noncode" className="text-center">
          <motion.h1
            className="section-title text-center"
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.3 }}
          >
            Apart From <span className="extra">Programming</span>
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={fadeInUp}
            viewport={{ once: false, amount: 0.2 }}
          >
            <NonTech />
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default CoursesPage;
