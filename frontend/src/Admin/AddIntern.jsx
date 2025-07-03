import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddIntern = () => {
  const { backendurl ,token} = useContext(MainContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confpassword, setConfpassword] = useState("");
  const [internship_name, setInternshipName] = useState("");
  const [internships, setInternships] = useState([]);
  const [type, setType] = useState("");
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");

  const semesterOptions = {
    "1st Year": ["1", "2"],
    "2nd Year": ["3", "4"],
    "3rd Year": ["5", "6"],
    "4th Year": ["7", "8"],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(`${backendurl}/api/internship/listinternship`);
        if (res1.data.success && Array.isArray(res1.data.internships)) {
          setInternships(res1.data.internships);
        } else {
          setInternships([]);
        }

         const res2 = await axios.get(`${backendurl}/api/batch/allbatches`, {
          headers: { token },
        });
        if (res2.data.success) {
 setBatches( res2.data.batches.filter((c)=>c.batchof=="Interns") || []);        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading data");
      }
    };
    fetchData();
  }, [backendurl]);

  const matchingBatches = batches.filter((batch) =>
    batch.courses.includes(internship_name)
  );

  const handleSubmit = async () => {
    try {
      const validateRes = await axios.post(`${backendurl}/api/intern/validateintern`, {
        email,
        phone,
        password,
        confpassword,
      });

      if (validateRes.data.success) {
        if (!selectedBatch) return toast.error("Please select a batch");

        const formDataintern = {
          email,
          password,
          phone,
          name,
          semester,
          college,
          city,
          internship_name,
          type
        };

        const registerRes = await axios.post(`${backendurl}/api/admin/addintern`, formDataintern ,{headers:{token}});

        if (registerRes.data.success) {
          const addToBatch = await axios.post(
            `${backendurl}/api/batch/addapplicant`,
            {
              batchId: selectedBatch,
              applicants: [name],
            }
          );

          if (addToBatch.data.success) {
            toast.success("Intern Added and Assigned to Batch");
            navigate("/admin");
          } else {
            toast.error("Failed to assign to batch");
          }
        } else {
          toast.error("Failed to Add Intern");
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
         Add Intern
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
              <Form.Group className="mb-3" controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Select onChange={(e) => setYear(e.target.value)} required>
                  <option value="">Select Year</option>
                  {Object.keys(semesterOptions).map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formSemester">
                <Form.Label>Semester</Form.Label>
                <Form.Select value={semester} onChange={(e) => setSemester(e.target.value)} required disabled={!year}>
                  <option value="">Select Semester</option>
                  {year && semesterOptions[year].map((s) => (
                    <option key={s} value={s}>{s} Sem</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCollege">
                <Form.Label>College</Form.Label>
                <Form.Control type="text" placeholder="Enter College Name" required onChange={(e) => setCollege(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formType">
                <Form.Label>Type</Form.Label>
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
              <Form.Group className="mb-3" controlId="forminternship_name">
                <Form.Label>Select Internship</Form.Label>
                <Form.Select value={internship_name} onChange={(e) => setInternshipName(e.target.value)} required>
                  <option value="">Select Internship</option>
                  {internships.map((item) => (
                    <option key={item._id} value={item.internship_name}>
                      {item.internship_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBatch">
                <Form.Label>Select Batch</Form.Label>
                <Form.Select value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)} required disabled={!internship_name}>
                  <option value="">Select Batch</option>
                  {matchingBatches.map((batch) => (
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
            Add Intern
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddIntern;