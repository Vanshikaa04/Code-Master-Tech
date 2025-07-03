import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./css/BlogPage.css";

const blogData = [
  {
    id: 1,
    title: "Guardians of the Digital World: Why Cybersecurity Matters More Than Ever",
    content:
      "In an era where data is currency, cyber threats are more dangerous than ever. From protecting personal identities to securing national infrastructure, cybersecurity is no longer optional — it’s essential. Learn how everyday practices and cutting-edge defenses are shaping a safer digital future.",
    image: "/cyber.png",
    date: "June 15, 2025",
  },
  {
    id: 2,
    title: "Rise of Intelligent Machines: Exploring AI & Machine Learning in Daily Life",
    content:
      "AI and Machine Learning are no longer science fiction. They're shaping how we shop, learn, communicate, and even heal. This article explores how these technologies are revolutionizing industries and redefining human potential in a smart, data-driven world.",
    image: "mlai.png",
    date: "June 28, 2025",
  },

];

const BlogPage = () => {
  return (
    <section className="py-5 blog-page">
      <Container>
<motion.h1
      className="section-title text-center"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
     <span className="extra"> BLOG  </span> 
    </motion.h1>

        {blogData.map((blog, index) => {
          const motionVariant = {
            hidden: { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
            show: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                duration: 0.7,
                delay: 0.1,
              },
            },
          };

          return (
            <motion.div
              className="mb-5"
              key={blog.id}
              variants={motionVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="p-3 shadow-sm border-0 blog-card">
                <Row className="align-items-center">
                  {/* Alternating layout */}
                  {index % 2 === 0 ? (
                    <>
                      <Col md={7}>
                        <h4 className="text-danger">{blog.title}</h4>
                        <p>{blog.content}</p>
                        <p className="text-muted mb-0">{blog.date}</p>
                      </Col>
                      <Col md={5}>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="img-fluid rounded"
                        />
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col md={5}>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col md={7}>
                        <h4 className="text-danger">{blog.title}</h4>
                        <p>{blog.content}</p>
                        <p className="text-muted mb-0">{blog.date}</p>
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
};

export default BlogPage;
