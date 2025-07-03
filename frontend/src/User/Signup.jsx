import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { backendurl } = useContext(MainContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [internship_name, setInternshipName] = useState("");
  const [degree_name, setDegreeName] = useState("");
  const [degrees, setDegrees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [internships, setInternships] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const isIntern = role === "Interns";
  const isCollegeStud = role === "College";

  const semesterOptions = {
    "1st Year": ["1", "2"],
    "2nd Year": ["3", "4"],
    "3rd Year": ["5", "6"],
    "4th Year": ["7", "8"],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "Students") {
          const res = await axios.get(`${backendurl}/api/course/listcourse`);
          setCourses(res.data.courses || []);
        } else if (role === "Interns") {
          const res = await axios.get(`${backendurl}/api/internship/listinternship`);
          setInternships(res.data.internships || []);
        } else if (role === "College") {
          const res = await axios.get(`${backendurl}/api/degree/listdegree`);
          setDegrees(res.data.degrees || []);
        }
      } catch (err) {
        toast.error("Error loading data");
        console.log(err)
      }
    };

    fetchData();
  }, [role]);

  const handleSubmit = async () => {
    if (!type || !email || !phone || !password || !name || !confpassword || !role) {
      return toast.error("Please fill all the fields");
    }

    try {
      const validateRes = await axios.post(`${backendurl}/api/user/validateuser`, {
        email, phone, password, confpassword,
      });

      if (!validateRes.data.success) return toast.error(validateRes.data.message);

      let registerRes;

      if (isIntern) {
        registerRes = await axios.post(`${backendurl}/api/intern/register`, {
          email, password, phone, name, semester, college, city, internship_name, type,
        });
      } else if (isCollegeStud) {
        registerRes = await axios.post(`${backendurl}/api/college/register`, {
          email, password, phone, name, semester, college, city, degree_name, type,
        });
      } else {
        registerRes = await axios.post(`${backendurl}/api/user/register`, {
          email, password, phone, name, role: 0, age, city, course: selectedCourse, type,
        });
      }

      if (registerRes.data.success) {
        toast.success("Signup successful. You will be notified once your request is accepted.");
        navigate("/");
      } else {
        toast.error("Failed to Signup");
      }
    } catch (error) {
      toast.error("Validation error");
      console.log(error)
    }
  };

  return (
    <div className="vh-fitcontent w-100 mb-3 mt-5 p-5">
      <Row className="h-100 g-0">
        {/* Left - Form */}
        <Col xs={12} md={6} className="d-flex align-items-center justify-content-center px-3">
          <Container>
            <Card className="p-4 shadow" style={{ borderRadius: "1rem" }}>
              <h3 className="text-center mb-4" style={{ color: "var(--bgcolor)" }}>
                Sign Up
              </h3>
              <Form>
                {/* -- Role Selection -- */}
                <Row className="mb-3">
                  <Col>
                    <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="">Select Role</option>
                      <option value="Interns">Interns</option>
                      <option value="Students">Students</option>
                      <option value="College">College Students (UG/PG)</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
                      <option value="">Select Type</option>
                      <option value="Online">Online</option>
                      <option value="Offline">Offline</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /></Form.Group>
                <Form.Group className="mb-3"><Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfpassword(e.target.value)} /></Form.Group>

                {/* Conditional Inputs */}
                {isIntern || isCollegeStud ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Select onChange={(e) => setYear(e.target.value)}>
                        <option value="">Select Year</option>
                        {Object.keys(semesterOptions).map((yr) => <option key={yr}>{yr}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} disabled={!year}>
                        <option value="">Select Semester</option>
                        {year && semesterOptions[year].map((s) => <option key={s}>{s}</option>)}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="College" onChange={(e) => setCollege(e.target.value)} />
                    </Form.Group>
                  </>
                ) : (
                  <Form.Group className="mb-3">
                    <Form.Control type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                  </Form.Group>
                )}

                {isIntern && (
                  <Form.Select value={internship_name} onChange={(e) => setInternshipName(e.target.value)}>
                    <option value="">Select Internship</option>
                    {internships.map((item) => (
                      <option key={item._id} value={item.internship_name}>{item.internship_name}</option>
                    ))}
                  </Form.Select>
                )}

                {isCollegeStud && (
                  <Form.Select value={degree_name} onChange={(e) => setDegreeName(e.target.value)}>
                    <option value="">Select Degree</option>
                    {degrees.map((item) => (
                      <option key={item._id} value={item.degree_name}>{item.degree_name}</option>
                    ))}
                  </Form.Select>
                )}

                {!isIntern && !isCollegeStud && (
                  <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course.course_name}>{course.course_name}</option>
                    ))}
                  </Form.Select>
                )}

                <Button onClick={handleSubmit} className="w-100 mt-3" style={{ backgroundColor: "var(--bgcolor)", border: "none" }}>Sign Up</Button>
              </Form>
              <div className="text-center mt-2">
                <small>
                  Already have an account?{' '}
                  <Button variant="link" onClick={() => navigate("/login")} className="p-0">
                    Login
                  </Button>
                </small>
              </div>
            </Card>
          </Container>
        </Col>

        {/* Right - Image */}
        <Col md={6} className="d-none d-md-block" style={{
          backgroundImage: 'url("/login.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }} />
      </Row>
    </div>
  );
};

export default Signup;