import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";
import { LayoutGrid, BetweenHorizontalEnd, Plus, Eye, Trash } from "lucide-react";

const Courses = ({ token }) => {
  const { backendurl } = useContext(MainContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState([]);
  const [gridView, setGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState([]);

  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    fees: "",
    duration: "",
    languages: [],
    languageInput: "",
    image: null,
    prerequisites: "",
    featured: "false",
  });

  // Fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/course/listcourse`);
      if (res.data.success && Array.isArray(res.data.courses)) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  // Add course
  const handleAddCourse = async () => {
    const {
      course_name,
      description,
      fees,
      duration,
      languages,
      image,
      prerequisites,
      featured,
    } = formData;
    if (
      !course_name ||
      !description ||
      !fees ||
      !duration ||
      languages.length === 0 ||
      !image
    ) {
      return toast.warning("All fields are required");
    }

    const data = new FormData();
    data.append("course_name", course_name);
    data.append("description", description);
    data.append("fees", fees);
    data.append("duration", duration);
    data.append("languages", JSON.stringify(languages));
    data.append("image", image);
    data.append("prerequisites", prerequisites);
    data.append("featured", featured);
    try {
      const res = await axios.post(`${backendurl}/api/course/addcourse`, data, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Course added");
        setShowModal(false);
        fetchCourses();
        setFormData({
          course_name: "",
          description: "",
          fees: "",
          duration: "",
          languages: [],
          languageInput: "",
          image: null,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding course");
    }
  };

  // Remove course
  const handleConfirmDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${backendurl}/api/course/removecourse`,
        { _id: id },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("Course deleted successfully!");
        // refresh or remove from local state
      } else {
        toast.error("Failed to delete course.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  // Language management
  const addLanguage = () => {
    if (formData.languageInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, prev.languageInput.trim()],
        languageInput: "",
      }));
    }
  };

  const removeLanguage = (lang) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l !== lang),
    }));
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleViewCourse = async (id) => {
    try {
      const res = await axios.post(
        `${backendurl}/api/course/singlecourse`,
        { courseid: id },
    
      );

      if (res.data.success) {
        setSelectedCourse(res.data.course);
        setShowDetailModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch course details:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [backendurl]);

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={4}>{/* <h3>Courses</h3> */}</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by course name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-end">
          <Button
            // variant={gridView ? "secondary" : "outline-secondary"}
            className="me-2"
            onClick={() => setGridView((prev) => !prev)}
            style={{
              backgroundColor: "transparent",
              color: "black",
              border: "none",
            }}
          >
            {gridView ? <LayoutGrid /> : <BetweenHorizontalEnd />}
          </Button>
          <Button onClick={() => setShowModal(true)}>
            {" "}
            <Plus className="fs-4" /> Add Course
          </Button>
        </Col>
      </Row>

      {/* <Row className="justify-content-center"> */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : !Array.isArray(filteredCourses) || filteredCourses.length === 0 ? (
        <p className="text-center">No courses available.</p>
      ) : !gridView ? (
        <Row className="justify-content-center">
          {filteredCourses.map((course) => (
            <Col key={course._id} md={6} lg={4} className="mb-4 d-flex">
              <Card
                className="w-100 shadow-sm"
                style={{ maxWidth: "80%", height: "100%" }}
              >
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                    borderBottom: "1px solid #ccc",

                    textAlign: "center",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={course.image}
                    style={{
                      height: "100%",
                      width: "80%",
                      objectFit: "contain",
                    }}
                  />
                  {course.featured && (
                    <span
                      className="badge bg-danger text-white position-absolute top-0 end-0 m-2"
                      style={{ zIndex: 1 }}
                    >
                      Featured
                    </span>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {course.course_name}
                  </Card.Title>
                  <Card.Text style={{ flex: 1 }}>
                    <small>
                      <strong>Fees:</strong> ₹{course.fees}
                    </small>
                    <br />
                    <small>
                      <strong>Duration:</strong> {course.duration}
                    </small>
                    <br />
                  </Card.Text>
                  <strong>Languages:</strong>
                  <div className=" mb-2" style={{ fontSize: "0.85rem" }}>
                    {(() => {
                      try {
                        const langs = JSON.parse(course.languages);
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
                          <span className="text-danger">Invalid languages</span>
                        );
                      }
                    })()}
                  </div>

                  <div className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        setCourseToDelete(course); // `course` is the current course object
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <>
          {filteredCourses.map((course, idx) => (
            <div key={idx} className="d-flex justify-content-center mb-3 mt-3">
              <Card
                className="shadow-sm w-100 mt-2 "
                style={{ maxWidth: "60%" }}
                key={course._id}
              >
                <Row className="mb-2 ">
                  <Col>
                    {course.featured && (
                    <span
                      className="badge bg-danger text-white position-absolute top-0 end-0   mt-1"
                      style={{ zIndex: 1 }}
                    >
                      Featured
                    </span>
                  )}
                  </Col>
                  </Row>
                <Card.Body>
                  <Row className="mb-2 ">
                    <Col md={8} className="mt-2">
                      <h5 className="text-danger mb-0">
                        {idx + 1}.{course.course_name}
                      </h5>
                    </Col>

                   
                <Col md={2} className="text-end mt-1">
                  <Button variant="success" size="sm" onClick={() => handleViewCourse(course._id)}>
                    <Eye size={18} />
                  </Button>
                </Col>

                <Col md={2} className="text-end mt-1">
                  <Button variant="danger" size="sm"
                        onClick={() => {
                        setCourseToDelete(course); // `course` is the current course object
                        setShowDeleteModal(true);
                        }}>
                    <Trash size={18} />
                  </Button>
                </Col>
              </Row>
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      )}


      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{courseToDelete?.course_name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(courseToDelete._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.course_name}
                onChange={(e) =>
                  setFormData({ ...formData, course_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fees</Form.Label>
              <Form.Control
                type="number"
                value={formData.fees}
                onChange={(e) =>
                  setFormData({ ...formData, fees: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Languages</Form.Label>
              <div className="d-flex mb-2">
                <Form.Control
                  type="text"
                  value={formData.languageInput}
                  placeholder="Enter language"
                  onChange={(e) =>
                    setFormData({ ...formData, languageInput: e.target.value })
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addLanguage())
                  }
                />
                <Button className="ms-2" onClick={addLanguage}>
                  Add
                </Button>
              </div>
              <div>
                {formData.languages.map((lang, idx) => (
                  <Badge
                    key={idx}
                    bg="info"
                    className="me-2 mb-1"
                    onClick={() => removeLanguage(lang)}
                    style={{ cursor: "pointer" }}
                  >
                    {lang} ×
                  </Badge>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prerequisites</Form.Label>
              <Form.Control
                type="text"
                value={formData.prerequisites}
                onChange={(e) =>
                  setFormData({ ...formData, prerequisites: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Featured</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Mark as Featured"
                  name="featured"
                  checked={formData.featured === "true"}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: prev.featured === "true" ? "false" : "true",
                    }))
                  }
                />
              </div>
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddCourse}>Add Course</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for course details */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            {selectedCourse?.course_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCourse && (
            <Card className="p-3">
              <p><strong>Fees:</strong> ₹{selectedCourse.fees}</p>
              <p><strong>Duration:</strong> {selectedCourse.duration}</p>
              <p><strong>Description:</strong> {selectedCourse.description}</p>
              <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites || "None"}</p>
              <p><strong>Languages:</strong></p>
                <div className=" mb-2" style={{ fontSize: "0.85rem" }}>
                    {(() => {
                      try {
                        const langs = JSON.parse(selectedCourse.languages);
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
                          <span className="text-danger">Invalid languages</span>
                        );
                      }
                    })()}
                  </div>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Courses;
