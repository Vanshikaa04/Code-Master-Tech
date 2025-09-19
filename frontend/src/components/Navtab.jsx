import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { MainContext } from "../context/MainContext";
import { User, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/images/Light_monogram.png";
import logo2 from "../assets/images/Dark_monogram.png";
import "./css/Navtab.css";
import { Menu } from "lucide-react";

const Navtab = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const { token, setToken, setUser, backendurl } = useContext(MainContext);

  const [courseMenu, setCourseMenu] = useState({
    label: "Courses",
    to: "/allcourses",
    items: [],
  });

  const handleLogout = () => {
    setToken("");
    setUser(null);
    sessionStorage.clear();
    navigate("/");
    toast.success("Logged Out Successfully!");
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(backendurl + "/api/course/listcourse");
      const featuredCourses = res.data.courses.filter((c) => c.featured);
      setCourseMenu({
        label: "Courses",
        to: "/allcourses",
        items: featuredCourses.map((c) => ({
          name: c.course_name,
          to: `/course/${c._id}`,
        })),
      });
    } catch (err) {
      toast.error("Failed to load courses");
      console.log(err)
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => setScrolled(window.scrollY > 7);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
  }, []);





  const backgroundColor = scrolled ? "var(--bgcolor)" : "transparent";

  const finallogo = scrolled ? logo : logo2;

  const dynamicStyle = {
    color: backgroundColor=="var(--bgcolor)"? "white": "var(--bgcolor)",
    background: "transparent",  
    border: "none",
    boxShadow: "none",
  };

  const menuTextStyle = expanded 
  ? { color: "white" } 
  : dynamicStyle;

  const staticMenus = [
    {
      label: "Company",
      to: "/company",
      items: [
        { name: "About Us", to: "/" },
        { name: "Blog", to: "/" },
        { name: "Events", to: "/" },
        { name: "Our Services", to: "/" },
        { name: "Industrial Projects", to: "/" },
      ],
    },
    {
      label: "Colleges",
      to: "/college",
      items: [
        { name: "Internships & Projects", to: "/" },
        { name: "Under Graduate Courses", to: "/" },
        { name: "Post Graduate Courses", to: "/" },
      ],
    },
  ];

  return (
    <Navbar
      expand="xl"
      expanded={expanded}
      onToggle={(e) => setExpanded(e)}
      fixed="top"
      className={`transition-all duration-300 px-4 py-4 ${scrolled ? "shadow-sm" : ""}`} 
      style={{ backgroundColor, zIndex: 999 }}
    >
      <Container  className="d-flexp-0">
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="brand-textm-0"
          style={{
            ...dynamicStyle,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <img src={finallogo} alt="Logo" id="cmdlogo"/>
        <span id="cmdtitle"> CODE MASTER TECHNOLOGY</span> 
        </Navbar.Brand>

       <Navbar.Toggle
  aria-controls="basic-navbar-nav"
  className="custom-toggle"
>
  {/* Custom Hamburger Icon */}
  <Menu 
 
    color={scrolled ? "white" : "black"} // 👈 scroll effect
  />
</Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {/* Courses Dropdown */}
            <NavDropdown
              title={
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(courseMenu.to);
                  }}
                  style={menuTextStyle}
                >
                  {courseMenu.label}
                </span>
              }
              id="nav-dropdown-courses"
              show={!expanded && hoveredDropdown === "courses"}
              onMouseEnter={() => !expanded && setHoveredDropdown("courses")}
              onMouseLeave={() => setHoveredDropdown(null)}
            >
              {courseMenu.items.map((item, idx) => (
                <NavDropdown.Item
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.to);
                  }}
                >
                  {item.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* Static Dropdowns */}
            {staticMenus.map((menu, idx) => (
              <NavDropdown
                key={idx}
                title={
                  <span style={menuTextStyle}>
                    {menu.label}
                  </span>
                }
                id={`nav-dropdown-${idx}`}
                show={!expanded && hoveredDropdown === menu.label}
                onMouseEnter={() => !expanded && setHoveredDropdown(menu.label)}
                onMouseLeave={() => setHoveredDropdown(null)}
                onClick={() => navigate(menu.to)}
              >
                {menu.items.map((item, i) => (
                  <NavDropdown.Item key={i} as={HashLink} to={item.to} smooth>
                    {item.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}

            {/* Direct Links */}
            <Nav.Link style={dynamicStyle} onClick={() => navigate("/quiz")}>
              Quiz
            </Nav.Link>
            <Nav.Link style={dynamicStyle} onClick={() => navigate("/events")}>
              Events
            </Nav.Link>
            <Nav.Link style={dynamicStyle} onClick={() => navigate("/blog")}>
              Blogs
            </Nav.Link>
             <Nav.Link style={dynamicStyle} onClick={() => navigate("/registercerti")}>
              Get Certified
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end gap-3">
          {token ? (
            <Dropdown align="end">
              <Dropdown.Toggle style={{ ...dynamicStyle }}>
                <User color={dynamicStyle} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profile")}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/orders")}>
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <button onClick={() => navigate("/login")} style={dynamicStyle}>
              Login
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navtab;
