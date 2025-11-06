import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeFromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CollegePage = () => {
  const { backendurl, token } = useContext(MainContext);
  const [internships, setInternships] = useState([]);
  const [degree, setDegrees] = useState([]);
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (!token) {
      navigate("/signup");
      toast.error("Signup to Enroll");
    }
  };

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/internship/listinternship`);
        if (res.data.success && Array.isArray(res.data.internships)) {
          setInternships(res.data.internships);
        } else {
          setInternships([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching Internships");
      }
    };

    const fetchDegrees = async () => {
      try {
        const res = await axios.get(`${backendurl}/api/degree/listdegree`);
        if (res.data.success && Array.isArray(res.data.degrees)) {
          setDegrees(res.data.degrees);
        } else {
          setDegrees([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching degrees");
      }
    };

    fetchInternships();
    fetchDegrees();
  }, []);

  return (
    <Container className="mt-5">
      {/* Internships Section */}
      <section id="internships" className="text-center mb-5">
        <motion.h3
          className="mb-4"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={{ once: false, amount: 0.3 }}
        >
         <span className="extra">Internships</span>
        </motion.h3>

        <Row>
          {internships.length > 0 ? (
            internships.map((internship, index) => (
              <Col md={4} key={internship._id} className="mb-4">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  variants={index % 2 === 0 ? fadeFromLeft : fadeFromRight}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <Card className="h-100 shadow-sm">
                    {/* {internship.image && (
                      <Card.Img
                        variant="top"
                        src={internship.image}
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                      />
                    )} */}
                    <Card.Body>
                      <Card.Title className="text-danger">
                        {internship.internship_name}
                      </Card.Title>
                      <Card.Text>
                        <strong>Duration:</strong> {internship.duration}
                        <br />
                        <strong>Fees:</strong> ₹{internship.fees}
                        <br />
                        <strong>Description:</strong> {internship.description}
                        <br />
                        <strong>What you will learn: </strong>
                        {(() => {
                          try {
                            const langs = JSON.parse(internship.languages);
                            return Array.isArray(langs)
                              ? langs.map((lang, idx) => (
                                  <span key={idx} className="me-1">
                                    {lang}
                                    {idx !== langs.length - 1 && ","}
                                  </span>
                                ))
                              : null;
                          } catch (err) {
                            toast.error(err);
                            return (
                              <span className="text-danger">
                                Invalid languages
                              </span>
                            );
                          }
                        })()}
                        <br />
                        <Button
                          variant="danger"
                          className="text-white mt-5"
                          onClick={handleEnroll}
                        >
                          Enroll Now
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <p className="text-muted">No internships available.</p>
          )}
        </Row>
      </section>

      {/* Degrees Section */}
      <section id="degree" className="text-center">
        <motion.h3
          className="mb-4 section-title"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="extra">Degree </span> Programs
        </motion.h3>

        <Row>
          {degree.length > 0 ? (
            degree.map((deg, index) => (
              <Col md={4} key={deg._id} className="mb-4">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  variants={index % 2 === 0 ? fadeFromLeft : fadeFromRight}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="text-danger">
                        {deg.degree_name}
                      </Card.Title>
                      <Card.Text>
                        <strong>Duration:</strong> {deg.duration}
                        <br />
                        <strong>Fees:</strong> ₹{deg.fees}
                        <br />
                        <strong>Description:</strong> {deg.description}
                        <br />
                        <Button
                          variant="danger"
                          className="text-white mt-5"
                          onClick={handleEnroll}
                        >
                          Enroll Now
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))
          ) : (
            <p className="text-muted">No degree programs available.</p>
          )}
        </Row>
      </section>
    </Container>
  );
};

export default CollegePage;
