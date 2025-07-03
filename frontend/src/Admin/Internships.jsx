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

const Internships = ({ token }) => {
  const { backendurl } = useContext(MainContext);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [internshipToDelete, setinternshipToDelete] = useState(null);
  const [gridView, setGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedinternship, setSelectedinternship] = useState(null);

  const [formData, setFormData] = useState({
    internship_name: "",
    description: "",
    fees: "",
    duration: "",
    languages: [],
    languageInput: "",
    image: null,

  });

  // Fetch Internships
  const fetchInternships = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/internship/listinternship`);
      console.log(res.data.internships)
      if (res.data.success && Array.isArray(res.data.internships)) {
        setInternships(res.data.internships);
      } else {
        setInternships([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching Internships");
    } finally {
      setLoading(false);
    }
  };

  // Add internship
  const handleAddinternship = async () => {
    const {
      internship_name,
      description,
      fees,
      duration,
      languages,
      image,
     
    } = formData;
    if (
      !internship_name ||
      !description ||
      !fees ||
      !duration ||
      languages.length === 0 ||
      !image
    ) {
      return toast.warning("All fields are required");
    }

    const data = new FormData();
    data.append("internship_name", internship_name);
    data.append("description", description);
    data.append("fees", fees);
    data.append("duration", duration);
    data.append("languages", JSON.stringify(languages));
    data.append("image", image);

    try {
      const res = await axios.post(`${backendurl}/api/internship/addinternship`, data, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Internship added");
        setShowModal(false);
        fetchInternships();
        setFormData({
          internship_name: "",
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
      toast.error("Error adding internship");
    }
  };

  // Remove internship
  const handleConfirmDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${backendurl}/api/internship/removeinternship`,
        { _id: id },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("internship deleted successfully!");
        // refresh or remove from local state
      } else {
        toast.error("Failed to delete internship.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    } finally {
      setShowDeleteModal(false);
      setinternshipToDelete(null);
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

  const filteredInternships = internships.filter((internship) =>
    internship.internship_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleViewinternship = async (id) => {
    try {
      const res = await axios.post(
        `${backendurl}/api/internship/singleinternship`,
        { internshipid: id },
    
      );

      if (res.data.success) {
        setSelectedinternship(res.data.internship);
        setShowDetailModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch internship details:", err);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [backendurl]);

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={4}>{/* <h3>Internships</h3> */}</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by internship name..."
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
            <Plus className="fs-4" /> Add internship
          </Button>
        </Col>
      </Row>

      {/* <Row className="justify-content-center"> */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : !Array.isArray(filteredInternships) || filteredInternships.length === 0 ? (
        <p className="text-center">No Internships available.</p>
      ) : !gridView ? (
        <Row className="justify-content-center">
          {filteredInternships.map((internship) => (
            <Col key={internship._id} md={6} lg={4} className="mb-4 d-flex">
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
                    src={internship.image}
                    style={{
                      height: "100%",
                      width: "80%",
                      objectFit: "contain",
                    }}
                  />
                  {internship.featured && (
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
                    {internship.internship_name}
                  </Card.Title>
                  <Card.Text style={{ flex: 1 }}>
                    <small>
                      <strong>Fees:</strong> ₹{internship.fees}
                    </small>
                    <br />
                    <small>
                      <strong>Duration:</strong> {internship.duration}
                    </small>
                    <br />
                  </Card.Text>
                  <strong>Languages:</strong>
                  <div className=" mb-2" style={{ fontSize: "0.85rem" }}>
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
                          <span className="text-danger">Invalid languages</span>
                        );
                      }
                    })()}
                  </div>

                  <div className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        setinternshipToDelete(internship); // `internship` is the current internship object
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
          {filteredInternships.map((internship, idx) => (
            <div key={idx} className="d-flex justify-content-center mb-3 mt-3">
              <Card
                className="shadow-sm w-100 mt-2 "
                style={{ maxWidth: "60%" }}
                key={internship._id}
              >
      
                <Card.Body>
                  <Row className="mb-2 ">
                    <Col md={8} className="mt-2">
                      <h5 className="text-danger mb-0">
                        {idx + 1}.{internship.internship_name}
                      </h5>
                    </Col>

                   
                <Col md={2} className="text-end mt-1">
                  <Button variant="success" size="sm" onClick={() => handleViewinternship(internship._id)}>
                    <Eye size={18} />
                  </Button>
                </Col>

                <Col md={2} className="text-end mt-1">
                  <Button variant="danger" size="sm"
                        onClick={() => {
                        setinternshipToDelete(internship); // `internship` is the current internship object
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
          <strong>{internshipToDelete?.internship_name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(internshipToDelete._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add internship Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Internship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Internship Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.internship_name}
                onChange={(e) =>
                  setFormData({ ...formData, internship_name: e.target.value })
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
          <Button onClick={handleAddinternship}>Add Internship</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for internship details */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            {selectedinternship?.internship_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedinternship && (
            <Card className="p-3">
              <p><strong>Fees:</strong> ₹{selectedinternship.fees}</p>
              <p><strong>Duration:</strong> {selectedinternship.duration}</p>
              <p><strong>Description:</strong> {selectedinternship.description}</p>
              <p><strong>Languages:</strong></p>
                <div className=" mb-2" style={{ fontSize: "0.85rem" }}>
                    {(() => {
                      try {
                        const langs = JSON.parse(selectedinternship.languages);
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

export default Internships;
