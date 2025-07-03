import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Card,
  Form,
  Modal
} from "react-bootstrap";
import { Check, Trash } from "lucide-react";
import axios from "axios";
import { MainContext } from "../context/MainContext";
import { toast } from "react-toastify";

const Requests = ({ token }) => {
  const [key, setKey] = useState("student");
  const { backendurl } = useContext(MainContext);
  const [pendingCollege, setPendingCollege] = useState([]);
  const [pendingStud, setPendingStud] = useState([]);
  const [pendingIntern, setPendingIntern] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState({
    id: null,
    name: "",
    type: "",
  });

  const getstudents = async () => {
    try {
      const res = await axios.get(backendurl + "/api/user/allstudents", {
        headers: { token },
      });
      if (res.data.success) {
        const students = res.data.stud || [];
        const filtered = students.filter((s) => s.status === "pending");
        setPendingStud(filtered);
      }
    } catch (e) {
      console.error("Error fetching students:", e);
    }
  };

  const getinterns = async () => {
    try {
      const res = await axios.get(backendurl + "/api/intern/allinterns", {
        headers: { token },
      });
      if (res.data.success) {
        const interns = res.data.intern || [];
        const filtered = interns.filter((i) => i.status === "pending");
        setPendingIntern(filtered);
      }
    } catch (e) {
      console.error("Error fetching interns:", e);
    }
  };
  const getCollegeStud = async () => {
    try {
      const res = await axios.get(backendurl + "/api/college/allstudents", {
        headers: { token },
      });
      if (res.data.success) {
        const college = res.data.student || [];
        const filtered = college.filter((i) => i.status === "pending");
        setPendingCollege(filtered);
      }
    } catch (e) {
      console.error("Error fetching Students:", e);
    }
  };

  const getBatches = async () => {
    try {
      const res = await axios.get(`${backendurl}/api/batch/allbatches`, {
        headers: { token },
      });
      if (res.data.success) {
        setBatches(res.data.batches || []);
      }
    } catch (err) {
      console.error("Error fetching batches:", err);
    }
  };

  const approveRequest = async (user, type) => {
    try {
      const batchId = selectedBatch[user._id];
      if (!batchId) return toast.error("Please select a batch");

      const addToBatch = await axios.post(
        `${backendurl}/api/batch/addapplicant`,
        {
          batchId,
          applicants: [user.name], // ✅ Fix: wrapped in array
        },
        { headers: { token } }
      );

      if (!addToBatch.data.success)
        return toast.error("Failed to assign to batch");

      const url =
        type === "student"
          ? "/api/user/updatestatus"
          : type === "intern"
          ? "/api/intern/updatestatus"
          : type === "college"
          ? "/api/college/updatestatus"
          : "";
      const res = await axios.post(
        backendurl + url,
        { _id: user._id, newStatus: "accepted" },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Request Approved & Added to Batch");
        if (type === "student") getstudents();
        else if (type === "college") getCollegeStud();
        else getinterns();
        setSelectedBatch((prev) => ({ ...prev, [user._id]: "" }));
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const removeRequest = async (id, type) => {
    try {
      const url =
        type === "student"
          ? "/api/user/removeuser"
          : type === "intern"
          ? "/api/intern/removeintern"
          : type === "college"
          ? "/api/college/removestudent"
          : "";
      const res = await axios.post(
        backendurl + url,
        { _id: id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        if (type === "student") getstudents();
        else if (type === "college") getCollegeStud();
        else getinterns();
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    getstudents();
    getinterns();
    getBatches();
    getCollegeStud();
  }, []);

  const renderBatchSelect = (userCourses, userId) => {
    // console.log(userCourses);
    const flatCourses = Array.isArray(userCourses)
      ? userCourses.flat()
      : [userCourses];

    // console.log(flatCourses);
    const matchingBatches = batches.filter((batch) =>
      batch.courses.some((c) => flatCourses.includes(c))
    );

    return (
      <Form.Select
        size="sm"
        value={selectedBatch[userId] || ""}
        onChange={(e) =>
          setSelectedBatch((prev) => ({ ...prev, [userId]: e.target.value }))
        }
      >
        <option value="">Select Batch</option>
        {matchingBatches.map((batch) => (
          <option key={batch._id} value={batch._id}>
            {batch.batch_name}
          </option>
        ))}
      </Form.Select>
    );
  };

  return (
    <>
      <Container fluid className="text-start mt-5 w-75">
        <h3 className="mb-5 text-center">Pending Requests</h3>
        <Row className="justify-content-center mb-4 mt-4">
          <Col xs="auto">
            <Tabs
              id="pending-requests-tabs"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="student" title="Students" />
              <Tab eventKey="intern" title="Interns" />
              <Tab eventKey="college" title="College" />
            </Tabs>
          </Col>
        </Row>

        {key === "student" && (
          <>
            {pendingStud && pendingStud.length > 0 ? (
              pendingStud.map((student, index) => (
                <Row key={index} className="justify-content-center mb-3">
                  <Card
                    className="shadow-sm w-100"
                    style={{ maxWidth: "100%" }}
                  >
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} md={3}>
                          <h5 className="text-danger">
                            {index + 1}. {student.name}
                          </h5>
                          <div>
                            <strong>Email:</strong> {student.email}
                          </div>
                          <div>
                            <strong>Phone:</strong> {student.phone}
                          </div>
                        </Col>
                        <Col xs={12} md={3}>
                          <div>
                            <strong>Age:</strong> {student.age}
                          </div>
                          <div>
                            <strong>City:</strong> {student.city}
                          </div>
                          <div>
                            <strong>Courses:</strong>{" "}
                            {Array.isArray(student.course)
                              ? student.course.join(", ")
                              : "-"}
                          </div>
                          <div>
                            <strong>Type:</strong> {student.type}
                          </div>
                        </Col>
                        <Col xs={6} md={3}>
                          {renderBatchSelect(student.course, student._id)}
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => approveRequest(student, "student")}
                          >
                            <Check size={18} />
                          </Button>
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="danger"
                            onClick={() =>
                              setRequestToDelete({
                                id: student._id,
                                name: student.name,
                                type: "student",
                              }) || setShowDeleteModal(true)
                            }
                          >
                            <Trash size={18} />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
              ))
            ) : (
              <h5 className="text-muted mt-5 text-center">
                No Pending Student Requests
              </h5>
            )}
          </>
        )}

        {key === "intern" && (
          <>
            {pendingIntern && pendingIntern.length > 0 ? (
              pendingIntern.map((intern, index) => (
                <Row key={index} className="justify-content-center mb-3">
                  <Card
                    className="shadow-sm w-100"
                    style={{ maxWidth: "100%" }}
                  >
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} md={3}>
                          <h5 className="text-danger">
                            {index + 1}. {intern.name}
                          </h5>
                          <div>
                            <strong>Email:</strong> {intern.email}
                          </div>
                          <div>
                            <strong>Phone:</strong> {intern.phone}
                          </div>
                          <div>
                            <strong>Type:</strong> {intern.type}
                          </div>
                        </Col>
                        <Col xs={12} md={3}>
                          <div>
                            <strong>{intern.internship_name || "-"}</strong>{" "}
                          </div>
                          <div>
                            <strong>College:</strong> {intern.college}
                          </div>
                          <div>
                            <strong>Semester:</strong> {intern.semester}
                          </div>
                          <div>
                            <strong>City:</strong> {intern.city}
                          </div>
                        </Col>
                        <Col xs={6} md={3}>
                          {renderBatchSelect(
                            [intern.internship_name],
                            intern._id
                          )}
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => approveRequest(intern, "intern")}
                          >
                            <Check size={18} />
                          </Button>
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="danger"
                            onClick={() =>
                              setRequestToDelete({
                                id: intern._id,
                                name: intern.name,
                                type: "intern",
                              }) || setShowDeleteModal(true)
                            }
                          >
                            <Trash size={18} />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
              ))
            ) : (
              <h5 className="text-muted text-center">
                No Pending Intern Requests
              </h5>
            )}
          </>
        )}
        {key === "college" && (
          <>
            {pendingCollege && pendingCollege.length > 0 ? (
              pendingCollege.map((college, index) => (
                <Row key={index} className="justify-content-center mb-3">
                  <Card
                    className="shadow-sm w-100"
                    style={{ maxWidth: "100%" }}
                  >
                    <Card.Body>
                      <Row className="align-items-center">
                        <Col xs={12} md={3}>
                          <h5 className="text-danger">
                            {index + 1}. {college.name}
                          </h5>
                          <div>
                            <strong>Email:</strong> {college.email}
                          </div>
                          <div>
                            <strong>Phone:</strong> {college.phone}
                          </div>
                          <div>
                            <strong>Type:</strong> {college.type}
                          </div>
                        </Col>
                        <Col xs={12} md={3}>
                          <div>
                            <strong>{college.degree_name || "-"}</strong>{" "}
                          </div>
                          <div>
                            <strong>College:</strong> {college.college}
                          </div>
                          <div>
                            <strong>Semester:</strong> {college.semester}
                          </div>
                          <div>
                            <strong>City:</strong> {college.city}
                          </div>
                        </Col>
                        <Col xs={6} md={3}>
                          {renderBatchSelect(
                            [college.degree_name],
                            college._id
                          )}
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="success"
                            className="me-2"
                            onClick={() => approveRequest(college, "college")}
                          >
                            <Check size={18} />
                          </Button>
                        </Col>
                        <Col xs={6} md={1} className="text-start">
                          <Button
                            variant="danger"
                            onClick={() =>
                              setRequestToDelete({
                                id: college._id,
                                name: college.name,
                                type: "college",
                              }) || setShowDeleteModal(true)
                            }
                          >
                            <Trash size={18} />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Row>
              ))
            ) : (
              <h5 className="text-muted text-center">
                No Pending College Students Requests
              </h5>
            )}
          </>
        )}
      </Container>

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
    <strong>{requestToDelete?.name}</strong>?
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
      Cancel
    </Button>
    <Button
      variant="danger"
      onClick={() => {
        removeRequest(requestToDelete.id, requestToDelete.type);
        setShowDeleteModal(false);
        setRequestToDelete({ id: null, name: "", type: "" });
      }}
    >
      Delete
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default Requests;
