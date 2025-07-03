import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { MainContext } from "../../context/MainContext";
import "../css/CourseInfo.css";
import {motion} from "framer-motion";

const CourseInfo = () => {
  const [courses, setCourses] = useState([]);
  const { backendurl } = useContext(MainContext);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(backendurl + "/api/course/listcourse");
        const allCourses = res.data.courses;

        const CourseInfo = allCourses.filter((c) => c.featured === true);
        setCourses(CourseInfo.slice(0, 4));
      } catch (err) {
        toast.error(err);
      } 

    };

    fetchCourses();
  }, []);

return (
  <Container className="py-4 ">
    {courses.length === 0 ? (
      <Alert variant="info animate__flash">Loading Courses...</Alert>
    ) : (
      <Row>
        {courses.map((course) => (
      <Col lg={3} md={4} sm={6} xs={12} className="mb-4">

            <motion.div
              className="course-card-wrapper"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Card className="course-card position-relative overflow-hidden">
                <Card.Img
                  variant="top"
                  src={course.image || "https://via.placeholder.com/300"}
                  className="course-img"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center z-2 position-relative">
                  <Card.Title className="course-title">
                    {course.course_name}
                  </Card.Title>
                </Card.Body>

                {/* Hover Overlay */}
                <div className="card-hover-overlay">
                  <div className="card-hover-content">
                    <p className="hover-text">{course.description?.slice()}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    )}
  </Container>
);
}

export default CourseInfo;
