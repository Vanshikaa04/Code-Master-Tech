import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  Carousel,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { MainContext } from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

const DataCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { backendurl } = useContext(MainContext);
  const navigate = useNavigate();

  const view = (id) => navigate(`/course/${id}`);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(backendurl + "/api/course/listcourse");
        const allCourses = res.data.courses;

        const dataCourses = allCourses.filter((course) => {
          try {
            return course.course_name.toLowerCase().includes("data");
          } catch (err) {
            toast.error(err.message);
            return false;
          }
        });

        setCourses(dataCourses);
      } catch (err) {
        setError("Failed to load courses.");
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: "1px solid #ddd",
    boxShadow: "0 0 6px rgba(0, 0, 0, 0.06)",
  };

  const imgStyle = {
    height: "160px",
    objectFit: "contain",
    padding: "10px",
    backgroundColor: "#fff",
    width: "100%",
  };

  const renderCard = (course) => (
    <Card style={cardStyle}>
      <Card.Img
        variant="top"
        src={course.image || "https://via.placeholder.com/300"}
        style={imgStyle}
      />
      <Card.Body className="text-center d-flex flex-column justify-content-between">
        <Card.Title className="text-danger" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
          {course.course_name}
        </Card.Title>
        <Button className="bg-danger mt-2" onClick={() => view(course._id)}>
          View More
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <Container className="py-4">
      <style>{`
        .loader {
          width: 50px;
          --b: 8px; 
          aspect-ratio: 1;
          border-radius: 50%;
          padding: 1px;
          background: conic-gradient(#0000 10%,#f03355) content-box;
          -webkit-mask:
            repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
            radial-gradient(farthest-side,#0000 calc(100% - var(--b) - 1px),#000 calc(100% - var(--b)));
          -webkit-mask-composite: destination-in;
                  mask-composite: intersect;
          animation:l4 1s infinite steps(10);
        }
        @keyframes l4 {to{transform: rotate(1turn)}}
      `}</style>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="loader" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : courses.length === 0 ? (
        <Alert variant="info">No courses available right now.</Alert>
      ) : isMobile ? (
        <Carousel controls={false} indicators={false} interval={3000} pause={false}>
          {courses.map((course) => (
            <Carousel.Item key={course._id}>
              <div className="d-flex justify-content-center px-4">
                <Col xs={12}>{renderCard(course)}</Col>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col md={3} sm={6} className="mb-4" key={course._id}>
              {renderCard(course)}
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DataCourses;
