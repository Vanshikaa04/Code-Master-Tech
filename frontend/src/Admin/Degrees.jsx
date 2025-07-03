import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";
import {
  LayoutGrid,
  BetweenHorizontalEnd,
  Plus,
  Eye,
  Trash,
} from "lucide-react";

const Degrees = ({ token }) => {
  const { backendurl } = useContext(MainContext);
  const [degrees, setdegrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [degreeToDelete, setdegreeToDelete] = useState(null);
  const [gridView, setGridView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selecteddegree, setSelecteddegree] = useState(null);

  const [formData, setFormData] = useState({
    degree_name: "",
    description: "",
    fees: "",
    duration: "",
  });

  // Fetch degrees
  const fetchdegrees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendurl}/api/degree/listdegree`);
      if (res.data.success && Array.isArray(res.data.degrees)) {
        setdegrees(res.data.degrees);
      } else {
        setdegrees([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching degrees");
    } finally {
      setLoading(false);
    }
  };

  // Add degree
  const handleAdddegree = async () => {
    const { degree_name, description, fees, duration } = formData;

    if (!degree_name || !description || !fees || !duration) {
      return toast.warning("All fields are required");
    }

    const data = { degree_name, description, fees, duration };

    // console.log(degree_name, description, fees, duration);
    try {
      const res = await axios.post(`${backendurl}/api/degree/adddegree`, data, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Degree added");
        setShowModal(false);
        fetchdegrees();
        setFormData({
          degree_name: "",
          description: "",
          fees: "",
          duration: "",
        });
      } else {
        console.error(res.data.message);
        toast.error("Unable to Add Degree");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding degree");
    }
  };

  // Remove degree
  const handleConfirmDelete = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${backendurl}/api/degree/removedegree`,
        { _id: id },
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success("degree deleted successfully!");
        // refresh or remove from local state
      } else {
        toast.error("Failed to delete degree.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    } finally {
      setShowDeleteModal(false);
      setdegreeToDelete(null);
    }
  };

  const filtereddegrees = degrees.filter((degree) =>
    degree.degree_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewdegree = async (id) => {
    try {
      const res = await axios.post(`${backendurl}/api/degree/singledegree`, {
        degreeid: id,
      });

      if (res.data.success) {
        setSelecteddegree(res.data.degree);
        setShowDetailModal(true);
      }
    } catch (err) {
      console.error("Failed to fetch degree details:", err);
    }
  };

  useEffect(() => {
    fetchdegrees();
  }, [backendurl]);

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col md={4}>{/* <h3>degrees</h3> */}</Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by degree name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-end">
          <Button
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
            <Plus className="fs-4" /> Add Degree
          </Button>
        </Col>
      </Row>

      {/* <Row className="justify-content-center"> */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : !Array.isArray(filtereddegrees) || filtereddegrees.length === 0 ? (
        <p className="text-center">No degrees available.</p>
      ) : !gridView ? (
        <Row className="justify-content-center">
          {filtereddegrees.map((degree) => (
            <Col key={degree._id} md={6} lg={6} className="mb-4 d-flex">
              <Card
                className="w-100 shadow-sm"
                style={{ maxWidth: "80%", height: "100%" }}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {degree.degree_name}
                  </Card.Title>
                  <Card.Text style={{ flex: 1 }}>
                    <small>
                      <strong>Fees:</strong> ₹{degree.fees}
                    </small>
                    <br />
                    <small>
                      <strong>Duration:</strong> {degree.duration}
                    </small>
                    <br />
                  </Card.Text>

                  <div className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        setdegreeToDelete(degree); // `degree` is the current degree object
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
          {filtereddegrees.map((degree, idx) => (
            <div key={idx} className="d-flex justify-content-center mb-3 mt-3">
              <Card
                className="shadow-sm w-100 mt-2 "
                style={{ maxWidth: "60%" }}
                key={degree._id}
              >
                <Card.Body>
                  <Row className="mb-2 ">
                    <Col md={8} className="mt-2">
                      <h5 className="text-danger mb-0">
                        {idx + 1}.{degree.degree_name}
                      </h5>
                    </Col>

                    <Col md={2} className="text-end mt-1">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleViewdegree(degree._id)}
                      >
                        <Eye size={18} />
                      </Button>
                    </Col>

                    <Col md={2} className="text-end mt-1">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setdegreeToDelete(degree); // `degree` is the current degree object
                          setShowDeleteModal(true);
                        }}
                      >
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
          <strong>{degreeToDelete?.degree_name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleConfirmDelete(degreeToDelete._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add degree Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New degree</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Degree Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.degree_name}
                onChange={(e) =>
                  setFormData({ ...formData, degree_name: e.target.value })
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdddegree}>Add degree</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for degree details */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">
            {selecteddegree?.degree_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selecteddegree && (
            <Card className="p-3">
              <p>
                <strong>Fees:</strong> ₹{selecteddegree.fees}
              </p>
              <p>
                <strong>Duration:</strong> {selecteddegree.duration}
              </p>
              <p>
                <strong>Description:</strong> {selecteddegree.description}
              </p>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Degrees;
