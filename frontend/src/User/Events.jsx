import React, { useState } from "react";
import { Container, Tab, Nav, Card, Button } from "react-bootstrap";
import "./css/Event.css";
import { motion } from "framer-motion";
const Events = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvent = {
    title: "Wired For Future: A Beginner's Tech Guide ",
    description: `Unlock the world of technology with this beginner-friendly seminar focused on building a strong foundation in computers and their role in today's digital society.
- How computers and the internet drive modern communication, education, and business
- An introduction to emerging technologies like cloud computing, AI, and cybersecurity

This seminar is ideal for anyone looking to enhance their digital confidence and keep up with the fast-evolving tech landscape. No prior technical knowledge required — just curiosity!`,
    date: "July 12, 2025",
    time: "10:00 AM - 11:00 AM &  11:00 AM - 12:00 PM ",
    image: "/event1.png", // Replace with your image
  };
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
     <span className="extra">   Events</span> 
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
              <div className="text-center py-5">
                <h2 className="text-danger">No past events !😓</h2>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </section>
  );
};

export default Events;
