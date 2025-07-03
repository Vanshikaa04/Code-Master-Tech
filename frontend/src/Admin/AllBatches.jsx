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

const AllBatches = () => {
  const { backendurl, token } = useContext(MainContext);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [batchFilter, setBatchFilter] = useState("Students");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [batchToDelete, setBatchToDelete] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);

  const [formData, setFormData] = useState({
    batch_name: "",
    courses: [],
    batchof: "Students",
  });

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/batch/allbatches`, {
        headers: { token },
      });
      if (res.data.success && Array.isArray(res.data.batches)) {
        setBatches(res.data.batches);
      } else {
        setBatches([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch batches");
    } finally {
      setLoading(false);
    }
  };

const fetchCourseOptions = async (type) => {
  const url =
    type === "Students"
      ? `${backendurl}/api/course/listcourse`:
    type === "Interns"? `${backendurl}/api/internship/listinternship`:
    type === "College"? `${backendurl}/api/degree/listdegree`: "";

  try {
    const res = await axios.get(url, { headers: { token } });
    // console.log("Fetched", type, "data:", res.data);

    let options = [];

    if (type === "Students" && res.data.success && Array.isArray(res.data.courses)) {
      console.log(res.data.courses)

      options = res.data.courses.map((item) => ({
        id: item._id,
        name: item.course_name,
      }));
    } else if (type === "Interns" && res.data.success && Array.isArray(res.data.internships)) {
      console.log(res.data.internships)
      options = res.data.internships.map((item) => ({
        id: item._id,
        name: item.internship_name,
      }));
    }
    else if (type === "College" && res.data.success && Array.isArray(res.data.degrees)) {
      console.log(res.data.degrees)
      options = res.data.degrees.map((item) => ({
        id: item._id,
        name: item.degree_name,
      }));
    }

    setCourseOptions(options);
    // console.log(courseOptions)
  } catch (err) {
    console.error("Error fetching options:", err);
    toast.error("Failed to load course/internship options");
  }
};


  useEffect(() => {
    fetchBatches();
  }, [backendurl, token]);

  useEffect(() => {
    fetchCourseOptions(formData.batchof);
  }, [formData.batchof]);

  const handleAddBatch = async () => {
    const { batch_name, courses, batchof } = formData;
    if (!batch_name || courses.length === 0) {
      return toast.warning("Please fill all required fields.");
    }

    const payload = { batch_name, courses, batchof };

    try {
      const res = await axios.post(
        `${backendurl}/api/batch/addnewbatch`,
        payload,
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Batch added");
        setShowAddModal(false);
        fetchBatches();
        setFormData({
          batch_name: "",
          courses: [],
          batchof: "Students",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding batch");
    }
  };

  const confirmDelete = (batch) => {
    setBatchToDelete(batch);
    setShowDeleteModal(true);
  };

  const handleRemove = async () => {
    if (!batchToDelete) return;
    try {
      const res = await axios.post(
        `${backendurl}/api/batch/removebatch`,
        { batchId: batchToDelete._id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Batch removed");
        fetchBatches();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove batch");
    } finally {
      setShowDeleteModal(false);
      setBatchToDelete(null);
    }
  };

  const openApplicantsModal = (batch) => {
    setSelectedApplicants(batch.applicants || []);
    setSelectedBatchName(batch.batch_name);
    setShowApplicantsModal(true);
  };

  const filteredBatches = batches.filter((b) => b.batchof === batchFilter);

  return (
    <Container className="mt-5">
      <Row className="mb-5">
        <Col className="text-end">
          <Form.Select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            style={{ width: "150px", display: "inline-block" }}
          >
            <option value="Students">Students</option>
            <option value="Interns">Interns</option>
            <option value="College">College Students</option>

          </Form.Select>
          <Button className="ms-2" onClick={() => setShowAddModal(true)}>
            Add New Batch
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : filteredBatches.length === 0 ? (
        <p className="text-center">No batches available.</p>
      ) : (
        filteredBatches.map((batch, index) => (
          <div key={batch._id} className="d-flex justify-content-center mb-3 mt-3">
            <Card className="shadow-sm w-100" style={{ maxWidth: "80%" }}>
              <Card.Body>
                <Row className="mb-2">
                  <Col>
                    <h5 className="text-danger mb-0">
                      {index + 1}. {batch.batch_name}
                    </h5>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col md={4}>
                    <strong>Courses:</strong> {batch.courses.join(", ")}
                  </Col>
                  <Col md={4} className="text-end">
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => openApplicantsModal(batch)}
                    >
                      View Applicants
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(batch)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        ))
      )}

      {/* Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{batchToDelete?.batch_name}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemove}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Batch Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Batch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Batch Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.batch_name}
                onChange={(e) =>
                  setFormData({ ...formData, batch_name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Batch Of</Form.Label>
              <Form.Select
                value={formData.batchof}
                onChange={(e) =>
                  setFormData({ ...formData, batchof: e.target.value })
                }
              >
                <option value="Students">Students</option>
                <option value="Interns">Interns</option>
                <option value="College">College Student</option>

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                {formData.batchof === "Students" ? "Select Courses" : formData.batchof === "Interns"?"Select Internships": "Select Degree"}
              </Form.Label>
              <Form.Select
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedItem = courseOptions.find((c) => c.id === selectedId);
                  if (
                    selectedItem &&
                    !formData.courses.includes(selectedItem.name)
                  ) {
                    setFormData((prev) => ({
                      ...prev,
                      courses: [...prev.courses, selectedItem.name],
                    }));
                  }
                }}
              >
                <option value="">-- Select --</option>
                {courseOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
              <div className="mt-2">
                {formData.courses.map((course, idx) => (
                  <Badge
                    key={idx}
                    bg="info"
                    className="me-2 mb-1"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        courses: prev.courses.filter((c) => c !== course),
                      }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {course} ×
                  </Badge>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBatch}>Add Batch</Button>
        </Modal.Footer>
      </Modal>

      {/* Applicants Modal */}
      <Modal show={showApplicantsModal} onHide={() => setShowApplicantsModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Applicants - {selectedBatchName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApplicants.length === 0 ? (
            <p>No applicants in this batch.</p>
          ) : (
            <ul className="list-group">
              {selectedApplicants.map((app, idx) => (
                <li key={idx} className="list-group-item">
                  {app}
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplicantsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AllBatches;
