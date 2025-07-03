import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MainContext } from "../context/MainContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendurl, user, setUser } = useContext(MainContext);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = backendurl + "/api/user/login";
      if (role === "interns") url = backendurl + "/api/intern/login";
      else if (role === "admin") url = backendurl + "/api/user/adminlogin";

      const response = await axios.post(url, { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed.");
    }
  };

  useEffect(() => {
    if (token) {
      toast.success(`Welcome ${user.name} !`);
      if (user.role === 1) navigate("/admin");
      else if (user.role === 0) navigate("/student");
      else if (user.role === "intern") navigate("/intern");
    }
  }, [token]);

  return (
    <div className="vh-100 w-100">
      <Row className="h-100 g-0">
        {/* Left Side - Image */}
        <Col
          md={6}
          className="d-none d-md-block"
          style={{
            backgroundImage: 'url("/login.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Col>

        {/* Right Side - Login Form */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center "
        >
          <Container>
            <Row className="justify-content-center">
              <Col xs={10} sm={8} md={9} lg={8}>
                <Card className="p-4 shadow" style={{ borderRadius: "1rem" }}>
                  <h3
                    className="text-center mb-3"
                    style={{ color: "var(--bgcolor)" }}
                  >
                    Login
                  </h3>
                  <Form.Group className="mb-3" controlId="formRole">
                    <Form.Select onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select role</option>
                      <option value="interns">Interns</option>
                      <option value="students">Students</option>
                      <option value="admin">Admin</option>
                    </Form.Select>
                  </Form.Group>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3"
                      style={{
                        backgroundColor: "var(--bgcolor)",
                        border: "none",
                      }}
                    >
                      Login
                    </Button>
                  </Form>

                  <div className="text-center">
                    <small>
                      Don't have an account?
                      <Button
                        variant="link"
                        onClick={() => navigate("/signup")}
                        className="p-0 ms-1"
                      >
                        Sign Up
                      </Button>
                    </small>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
