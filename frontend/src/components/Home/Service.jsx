import React from 'react'
import { Card, Container, Row, Col } from "react-bootstrap";
import {motion} from "framer-motion"
import "../css/Service.css"

const services = [
  {
    title: "Web Development",
    description:
      "Custom, scalable, and responsive websites built using the latest technologies."
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications to bring your business to your customers’ hands."
  },
  {
    title: "UI/UX Design",
    description:
      "Intuitive and engaging designs that provide an excellent user experience."
  },
  {
    title: "Digital Marketing",
    description:
      "Targeted marketing strategies that boost your online presence and engagement."
  }
];

const Service = () => {
 return (
    <section className="services-section py-5">
      <Container>
        <Row>
          {services.map((service, index) => (
            <Col
              md={6}
              lg={3}
              key={index}
              className="mb-4 d-flex justify-content-center"
            >
              <motion.div
                className="animated-card"
             initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              >
                <div className="card-title text-danger">{service.title}</div>
                <div className="card-description">{service.description}</div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
      );
}

export default Service
