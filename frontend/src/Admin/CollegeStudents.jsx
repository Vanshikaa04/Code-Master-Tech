import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const CollegeStudents = ({token}) => {
  const { backendurl } = useContext(MainContext);
  const [students, setstudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchstudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/college/allstudents`, {
        headers: { token },
      });
      if (res.data.success && Array.isArray(res.data.student)) {
        const acceptedstudents = res.data.student.filter(
          (i) => i.status === "accepted"
        );
        setstudents(acceptedstudents);
      } else {
        setstudents([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchstudents();
  }, [backendurl, token]);

  const filteredstudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col></Col>
        <Col md={4} className="text-end mb-5 mt-3">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : filteredstudents.length === 0 ? (
        <p className="text-center">No accepted students found.</p>
      ) : (
        filteredstudents.map((student, index) => (
          <div key={student._id} className="d-flex justify-content-center mb-3">
            <Card className="shadow-sm w-100" style={{ maxWidth: "80%" }}>
              <Card.Body>
                <Row className="mb-2">
                  <Col>
                    <h5 className="text-danger mb-0">{index + 1}. {student.name}</h5>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={4}><strong>Email:</strong> {student.email}</Col>
                  <Col md={4}><strong>Phone:</strong> {student.phone}</Col>
                  <Col md={4}><strong>City:</strong> {student.city}</Col>
                </Row>
                <Row className="align-items-center mt-2">
                  <Col md={4}><strong>Semester:</strong> {student.semester}</Col>
                  <Col md={4}><strong>College:</strong> {student.college}</Col>
                  <Col md={4}><strong>Joining Date:</strong> {new Date(student.createdAt).toLocaleDateString()}</Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </Container>
  );
};

export default CollegeStudents;
