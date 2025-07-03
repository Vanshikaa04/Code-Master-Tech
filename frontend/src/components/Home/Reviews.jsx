import { Carousel, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "../css/Review.css";
import { useEffect, useState } from "react";

const reviews = [
  {
    name: "Manisha Chaudhary ",
    review: "After going to the Institute... best knowledge from this institute just like me.",
  },
  {
    name: "Riya Nayak",
    review: "I recently completed CCC and SQL training from Code Master Technology...",
  },
  {
    name: "Jadav Abhi",
    review: "Great mentors and hands-on... It's made my academic journey a success!",
  },
  {
    name: "Viya Sukhadiya",
    review: "Literally, the best place to start your coding journey...",
  },
  {
    name: "MANAV Soni",
    review: "When I joined this institute I was a beginner in coding...",
  },
  {
    name: "Harshit Patel",
    review: "I'm studying here since month but I got lots of knowledge from Abhishek sir...",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Reviews = () => {
  const mainText = "CODE MASTER TECHNOLOGY ";
  const highlightText = "reviews";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
    <div className="h-fitcontent mb-3">
      {/* Title Section */}
      <div className="searchbar">
        <motion.div
          className="text-center maindiv"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.5 }}
        >
          <p className="ptext">
            {mainText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letter}
                className="animated-letter text-danger"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            {highlightText.split("").map((char, index) => (
              <motion.span
                key={`h-${index}`}
                variants={letter}
                className="highlight-letter"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>
        </motion.div>
      </div>

      {/* Review Carousel */}
      <div className="reviewbox">
        <Carousel indicators={false} interval={4000} controls>
          {reviews.map((item, idx) => (
            <Carousel.Item key={idx}>
              <Row className="justify-content-center">
                <Col xs={12} md={6}>
                  <motion.div
                    className="p-2"
                    variants={cardMotion}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <Card className="review-card">
                      <Card.Body>
                        <h6 className="text-danger fw-bold">{item.name}</h6>
                        <Card.Text className="text-muted">
                          {item.review}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      </div>
    </>
  );
};

export default Reviews;
