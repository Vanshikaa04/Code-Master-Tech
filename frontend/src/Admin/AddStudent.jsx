import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const { backendurl, token } = useContext(MainContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [type, setType] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    axios
      .get(`${backendurl}/api/course/listcourse`)
      .then((res) => {
        if (res.data.success && Array.isArray(res.data.courses)) {
          setCourses(res.data.courses);
        } else {
          setCourses([]);
        }
      })
      .catch((err) => {
        toast.error("Error loading courses");
        console.log(err);
      });

    const getBatches = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/batch/allbatches`, {
          headers: { token },
        });
      
        if (res.data.success) {
       
          setBatches( res.data.batches.filter((c)=>c.batchof=="Students") || []);
        }
      } catch (err) {
        console.error("Error fetching batches:", err);
      }
    };

    getBatches();
  }, [backendurl, token]);

  const handleSubmit = async () => {
    try {
      const validateRes = await axios.post(`${backendurl}/api/user/validateuser`, {
        email,
        phone,
        password,
        confpassword,
      });

      if (validateRes.data.success) {
        const formDatastudent = {
          email,
          password,
          phone,
          name,
          role: 0,
          age,
          city,
          course: selectedCourse,
          type,
        };

        const registerRes = await axios.post(`${backendurl}/api/admin/addstudent`, formDatastudent, {headers:{token}});

        console.log(registerRes.data)
        if (registerRes.data.success) {
          const addToBatch = await axios.post(
            `${backendurl}/api/batch/addapplicant`,
            {
              batchId: selectedBatch,
              applicants: [name],
            },
            { headers: { token } }
          );

          if (!addToBatch.data.success) return toast.error("Failed to assign to batch");

          toast.success("Student Added and Assigned to Batch");
          navigate("/admin");
        } else {
          toast.error("Failed to Add Student");
        }
      } else {
        toast.error(validateRes.data.message);
      }
    } catch (error) {
      toast.error("Validation error");
      console.log(error);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-100">
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "700px" }}>
        <h3 className="text-center mb-4" style={{ color: "var(--bgcolor)" }}>
          Add Student
        </h3>

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="number" placeholder="Enter Phone Number" required onChange={(e) => setPhone(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" required onChange={(e) => setCity(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required onChange={(e) => setConfpassword(e.target.value)} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Enter Age" required onChange={(e) => setAge(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formType">
                <Form.Label>Select Type</Form.Label>
                <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
                  <option value="">Select Type</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCourse">
                <Form.Label>Select Course</Form.Label>
                <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} required>
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.course_name}>
                      {course.course_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3" controlId="formBatch">
  <Form.Label>Select Batch</Form.Label>
  <Form.Select
    value={selectedBatch}
    onChange={(e) => setSelectedBatch(e.target.value)}
    required
    disabled={!selectedCourse} // disable if course not selected
  >
    <option value="">Select Batch</option>
    {selectedCourse &&
      batches
        .filter((batch) => batch.courses.includes(selectedCourse))
        .map((batch) => (
          <option key={batch._id} value={batch._id}>
            {batch.batch_name}
          </option>
        ))}
  </Form.Select>
</Form.Group>

            </Col>
          </Row>

          <Button
            variant="primary"
            onClick={handleSubmit}
            className="w-100 mb-3"
            style={{ backgroundColor: "var(--bgcolor)", border: "none" }}
          >
            Add Student
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddStudent;
