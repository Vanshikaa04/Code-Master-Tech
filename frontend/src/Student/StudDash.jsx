import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import {
  BookOpen,
  ShoppingCart,
  User,
  LogOut,
  Layers,
  SquarePen,
} from "lucide-react";
import { MainContext } from "../context/MainContext";
import { useNavigate ,Outlet} from "react-router-dom";
import { toast } from "react-toastify";

const StudDash = ({user, token, setToken ,setUser}) => {
 
  const navigate = useNavigate();
  const isStudent= location.pathname === "/student" ;

  const handleLogout=()=>{
    setToken("")
    setUser("")
    toast.success("Logged Out Succesfully")
  }
 useEffect(()=>{
    if(!token)
      navigate("/")
  })

  const handleTest = () => {
    navigate("test");
  };

  const handleBuyCourse = () => {
    navigate("enroll");
  };

  const handleProfile = () => {
    navigate("profile");
  };

  return (
    <Container fluid className="p-0">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand>Student Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="student-navbar" />
      </Navbar>

      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-light d-flex flex-column justify-content-between vh-100 p-3 shadow-sm">
          <div>
            <h5 className="mb-4"><Layers className="me-2" />Menu</h5>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={handleTest} className="d-flex align-items-center">
                <SquarePen className="me-2" /> Test
              </ListGroup.Item>
              <ListGroup.Item action onClick={handleBuyCourse} className="d-flex align-items-center">
                <ShoppingCart className="me-2" /> Buy New Course
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={handleProfile} className="d-flex align-items-center">
                <User className="me-2" /> Profile
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={handleLogout}
                className="d-flex align-items-center text-danger"
              >
                <LogOut className="me-2" /> Logout
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        {/* Main Content */}
        {isStudent?(
        <Col md={10} className="p-4">
          <h3 className="mb-4">My Learning</h3>
          <Row>
         {user?.course?.length > 0 ? (
  user.course.map((courseName, index) => (
    <Col md={4} key={index} className="mb-4">
      <Card>
        <Card.Body>
          <Card.Title><BookOpen className="me-2" />{courseName}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  ))  
) : (
  <Col>
    <p>No courses enrolled yet.</p>
  </Col>
)}

          </Row>
        </Col>
        ):
        (
          <Outlet/>
        )}
      </Row>
    </Container>
  );
};

export default StudDash;
