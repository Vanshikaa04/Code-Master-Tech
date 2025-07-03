import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import vishv from "../../assets/projects/vishv.png";
import rudra from "../../assets/projects/rudra.png";
import rudrapfp from "../../assets/projects/rudrapfp.jpg";
import vishvpfp from "../../assets/projects/vishvpfp.jpg";

// Sample data
const students = [
  {
    name: "Vishv Limbchiya",
    age: 13,
    profilePic: vishvpfp,
    projectImage: vishv,
    to: "https://vishvlimbchiya.in/"
  },
  {
    name: "Nayak Rudra",
    age: 20,
    profilePic: rudrapfp,
    projectImage: rudra,
    to: "https://admirable-gelato-191c06.netlify.app/"
  }
];

// Framer motion animation variants
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const StudentProjects = () => {
  return (
    <Container className="py-4">
      <Row className="g-4 justify-content-center">
        {students.map((student, idx) => (
          <Col key={idx} xs={10} sm={6} md={4} lg={3}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="shadow-sm rounded-4 h-100 align-items-center">
                <Card.Img
                  variant="top"
                  src={student.projectImage}
                  alt="Project Banner"
                  className="rounded-top-4"
                  style={{ width: "100%", height: "100%" }}
                />
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={4} className="text-center mt-3">
                      <Image
                        src={student.profilePic}
                        roundedCircle
                        fluid
                        alt="Pfp"
                        style={{
                          width: "100px",
                          height: "60px",
                          objectFit: "cover",
                          marginTop: "2%"
                        }}
                      />
                    </Col>
                    <Col xs={8}>
                      <h6 className="mb-1">{student.name}</h6>
                      <p className="text-muted mb-0">Age: {student.age}</p>
                    </Col>
                  </Row>
                  <Row className="mt-3 justify-content-center">
                    <Col md={12} sm={6}>
                      <Button variant="danger" href={student.to} target="_blank">
                        Live Demo
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StudentProjects;
