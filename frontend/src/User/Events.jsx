import React, { useState } from "react";
import {
  Container,
  Tab,
  Nav,
  Card,
  Button,
  Carousel,
  Row,
  Col,
} from "react-bootstrap";
import "./css/Event.css";
import { motion } from "framer-motion";

const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvent = {
    title: "CyberShield: Defend Your Digital World",
    description: `🔸 Explore how cybercriminals operate in today’s online world
🔸 Understand common threats like phishing, data breaches, and social engineering
🔸 Learn essential practices to protect your identity, devices, and digital footprint
🔸 Get introduced to tools and strategies used by professionals in the cybersecurity industry`,
    date: "July 26, 2025",
    time: "-",
    image: "/cyber.png",
  };

  const previousEvents = [
    {
      title: "Wired For Future: A Beginner's Tech Guide",
      images: ["/events/e1.4.jpg","/events/e1.3.jpg","/events/e1.1.jpg","/events/e1.2.jpg"],
    },
  
  ];

  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.6,
        delay: 0.1,
      },
    },
  };

  const renderPreviousEvents = () => {
    return (
      <Row className="g-4 justify-content-center">
        {previousEvents.map((event, index) => (
          <Col key={index} xs={12} md={6} lg={5}>
            <Card
              className="shadow-sm border-0"
              style={{ backgroundColor: "var(--bgcolor2)" }}
            >
              <Carousel interval={3000} pause="hover">
                {event.images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <img
                      className="d-block w-100"
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      style={{ height: "350px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <Card.Body className="text-center">
                <h5 className="text-danger title">{event.title}</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <section className="events-section py-5">
      <Container>
        <motion.h1
          className="section-title text-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <span className="extra">Events</span>
        </motion.h1>

        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="pills" className="justify-content-center mb-4">
            <Nav.Item>
              <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="previous">Previously</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* UPCOMING */}
            <Tab.Pane eventKey="upcoming">
              <motion.div
                variants={containerVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card
                  className="shadow-sm border-0 mx-auto"
                  style={{
                    maxWidth: "600px",
                    backgroundColor: "var(--bgcolor2)",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={upcomingEvent.image}
                    alt={upcomingEvent.title}
                  />
                  <Card.Body className="text-center">
                    <h4 className="text-danger title">{upcomingEvent.title}</h4>
                    {upcomingEvent.description.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                    <p>
                      <strong>Date:</strong> {upcomingEvent.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {upcomingEvent.time}
                    </p>
                    <Button variant="danger">Enroll Now</Button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Tab.Pane>

            {/* PREVIOUS */}
            <Tab.Pane eventKey="previous">
              <motion.div
                variants={containerVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {previousEvents.length > 0 ? (
                  renderPreviousEvents()
                ) : (
                  <div className="text-center py-5">
                    <h2 className="text-danger">No past events! 😓</h2>
                  </div>
                )}
              </motion.div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
};

export default Events;
