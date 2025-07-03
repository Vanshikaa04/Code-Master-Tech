import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Navbar, Nav, Image } from "react-bootstrap";
import {
  Menu,
  Search,
  Pencil,
  CalendarDays,
  CirclePlus,
  LogOut,
  User,
  Home,
} from "lucide-react";
import "./css/AdminDash.css";
import axios from "axios";

import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MainContext } from "../context/MainContext";

const AdminDash = ({ token, setToken, setUser }) => {
  const { backendurl } = useContext(MainContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isHome = location.pathname === "/admin";
  const [counts, setCounts] = useState({
    students: 0,
    interns: 0,
    courses: 0,
    batches: 0,
    pending: 0,
    internships: 0,
    degree:0,
    collegestud: 0
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setUser("");
    toast.success("Logged Out Succesfully");
  };
  useEffect(() => {
    if (!token) navigate("/");
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [studentsRes, internsRes, coursesRes, batchesRes, internshipRes, degreeRes, collegeStudentsRes] =
          await Promise.all([
            axios.get(`${backendurl}/api/user/allstudents`, {
              headers: { token },
            }),
            axios.get(`${backendurl}/api/intern/allinterns`, {
              headers: { token },
            }),
            axios.get(`${backendurl}/api/course/listcourse`, {
              headers: { token },
            }),
            axios.get(`${backendurl}/api/batch/allbatches`, {
              headers: { token },
            }),
            axios.get(`${backendurl}/api/internship/listinternship`, {
              headers: { token },
            }),
                        axios.get(`${backendurl}/api/degree/listdegree`, {
              headers: { token },
            }),
                        axios.get(`${backendurl}/api/college/allstudents`, {
              headers: { token },
            }),
          ]);

        const allStudents = studentsRes.data.stud || [];
        const allInterns = internsRes.data.intern || [];
        const collegeStudents =collegeStudentsRes.data.student || [];

        setCounts({
          students:
          studentsRes.data.stud?.filter((s) => s.status === "accepted").length || 0,
          interns:internsRes.data.intern?.filter((i) => i.status === "accepted").length || 0,
          collegestud: collegeStudentsRes.data.student?.filter((i) => i.status === "accepted").length || 0,
          courses: coursesRes.data.courses?.length || 0,
          batches: batchesRes.data.batches?.length || 0,
          internships: internshipRes.data.internships?.length || 0,
          degree: degreeRes.data.degrees?.length || 0,

          pending:
            allStudents.filter((s) => s.status === "pending").length +
            allInterns.filter((i) => i.status === "pending").length+collegeStudents.filter((c)=>c.status==="pending").length,
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, [backendurl, token]);
  return (
    <div className="bg-light min-vh-100">
      <Navbar
        bg="light"
        expand="lg"
        className="shadow-sm fixed-top w-100"
        style={{ zIndex: 999 }}
      >
        <Container fluid>
          <Navbar.Brand href="#" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="me-2" /> Admin Panel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </Container>
      </Navbar>

      {/* Sidebar and Main Content */}
      <div>
        {/* Sidebar */}
        <div
          className={`bg-dark text-white p-3 sidebar d-flex flex-column justify-content-between transition ${
            sidebarOpen ? "sidebar-open" : "sidebar-closed"
          }`}
          style={{
            position: "fixed",
            top: "56px", // Below navbar
            left: 0,
            height: "calc(100vh - 56px)", // Full height below navbar
            width: "250px",
            zIndex: 998,
            overflowY: "auto",
            transition: "left 0.3s",
          }}
        >
          {/* Sidebar Content */}
          <div>
            <Nav className="flex-column mt-3">
              <Nav.Link
                className="text-white mt-3"
                onClick={() => navigate("/admin")}
              >
                <Home className="me-2" /> Home
              </Nav.Link>
            
              <Nav.Link
                className="text-white"
                onClick={() => navigate("addstudent")}
              >
                <CirclePlus className="me-2" /> Add Student
              </Nav.Link>
              <Nav.Link
                className="text-white"
                onClick={() => navigate("addintern")}
              >
                <CirclePlus className="me-2" /> Add Intern
              </Nav.Link>
              <Nav.Link
                className="text-white"
                onClick={() => navigate("addcollegestudent")}
              >
                <CirclePlus className="me-2" /> Add College Student
              </Nav.Link>
            </Nav>
          </div>

          <div
            className="text-white d-block text-center bg-danger align-content-center fw-bold mb-2"
            onClick={() => handleLogout()}
            style={{ height: "5vh", cursor: "pointer" }}
          >
            <LogOut size={16} className="me-2 fw-bold" /> Log Out
          </div>
        </div>

        {/* Main Content */}
        <div
          className="main-content"
          style={{
            marginLeft: "250px", // Same as sidebar width
            paddingTop: "70px", // Enough space for fixed navbar
            paddingRight: "1rem",
            paddingLeft: "1rem",
          }}
        >
          {isHome ? (
            <Container fluid>
              <Row className="mb-3"></Row>

              {/* Stat Boxes */}
              <Row>
                {[
                  {
                    title: "Pending Requests",
                    value: counts.pending,
                    color: "danger",
                    svg: "M12 2a10 10 0 100 20 10 10 0 000-20zM13 11h4v2h-4v4h-2v-4H7v-2h4V7h2v4z",
                    path: "pendingreq",
                  },
                  {
                    title: "Batches",
                    value: counts.batches,
                    color: "warning",
                    svg: "M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",
                    path: "batches",
                  },
                       {
                    title: "Courses",
                    value: counts.courses,
                    color: "info",
                    svg: "M12 2a10 10 0 00-6 18.2V14H4v-2h2v-2a6 6 0 0112 0v2h2v2h-2v6.2A10 10 0 0012 2z",
                    path: "courses",
                  },
                  {
                    title: "All Students",
                    value: counts.students,
                    color: "success",
                    svg: "M12 12c2.7 0 5.75 1.34 6 4v1H6v-1c.25-2.66 3.3-4 6-4zM12 2a4 4 0 110 8 4 4 0 010-8z",
                    path: "allstudents",
                  },
                  {
                    title: "All Interns",
                    value: counts.interns,
                    color: "success",
                    svg: "M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z",
                    path: "allinterns",
                  },
                            {
                    title: "All College Students",
                    value: counts.collegestud,
                    color: "success",
                    svg: "M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z",
                    path: "collegestudents",
                  },
                       {
                    title: "Degrees",
                    value: counts.degree,
                    color: "info",
                    svg: "M12 2a10 10 0 00-6 18.2V14H4v-2h2v-2a6 6 0 0112 0v2h2v2h-2v6.2A10 10 0 0012 2z",
                    path: "degrees",
                  },
             
                  {
                    title: "Internships",
                    value: counts.internships,
                    color: "info",
                    svg: "M12 2a10 10 0 00-6 18.2V14H4v-2h2v-2a6 6 0 0112 0v2h2v2h-2v6.2A10 10 0 0012 2z",
                    path: "internships",
                  },
                ].map((box, index) => (
                  <Col lg={4} sm={6} className="mb-4" key={index}>
                    <div
                      className={`p-3 text-white bg-${box.color} rounded shadow position-relative`}
                      onClick={() => navigate(box.path)}
                    >
                      <div className="inner">
                        <h3>{box.value}</h3>
                        <p>{box.title}</p>
                      </div>
                      <svg
                        className="position-absolute top-0 end-0 m-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        width="40"
                        height="40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={box.svg} />
                      </svg>
                      <div className="mt-2" onClick={() => navigate(box.path)}>
                        More info
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
