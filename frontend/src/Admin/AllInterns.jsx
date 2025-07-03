import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Spinner, Form } from "react-bootstrap";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const AllInterns = ({token}) => {
  const { backendurl } = useContext(MainContext);
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchInterns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/intern/allinterns`, {
        headers: { token },
      });
      if (res.data.success && Array.isArray(res.data.intern)) {
        const acceptedInterns = res.data.intern.filter(
          (i) => i.status === "accepted"
        );
        setInterns(acceptedInterns);
      } else {
        setInterns([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch interns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, [backendurl, token]);

  const filteredInterns = interns.filter((intern) =>
    intern.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      ) : filteredInterns.length === 0 ? (
        <p className="text-center">No accepted interns found.</p>
      ) : (
        filteredInterns.map((intern, index) => (
          <div key={intern._id} className="d-flex justify-content-center mb-3">
            <Card className="shadow-sm w-100" style={{ maxWidth: "80%" }}>
              <Card.Body>
                <Row className="mb-2">
                  <Col>
                    <h5 className="text-danger mb-0">{index + 1}. {intern.name}</h5>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={4}><strong>Email:</strong> {intern.email}</Col>
                  <Col md={4}><strong>Phone:</strong> {intern.phone}</Col>
                  <Col md={4}><strong>City:</strong> {intern.city}</Col>
                </Row>
                <Row className="align-items-center mt-2">
                  <Col md={4}><strong>Semester:</strong> {intern.semester}</Col>
                  <Col md={4}><strong>College:</strong> {intern.college}</Col>
                  <Col md={4}><strong>Joining Date:</strong> {new Date(intern.createdAt).toLocaleDateString()}</Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </Container>
  );
};

export default AllInterns;
