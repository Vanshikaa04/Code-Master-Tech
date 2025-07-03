import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const sentence = "Learn  by  doing. Intern with experts. Grow your career — faster.";
const words = sentence.split(" ");

const emphasizedWords = ["Learn", "Intern", "Grow"];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Video = () => {
  return (
    <Container fluid className="py-5 my-3 " style={{width:"80%"}}>
      <Row className="align-items-center">
        {/* Left - Animated Text */}
        <Col md={5} className="text-center text-md-start">
           <motion.h2
            className="display-5 fw-bold"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            {words.map((word, index) => {
              const cleanWord = word.replace(/[^\w]/g, ""); // remove punctuation
              const isEmphasized = emphasizedWords.includes(cleanWord);

              return (
                <motion.span
                  key={index}
                  variants={wordVariants}
                  style={{
                    marginRight: "5px",
                    display: "inline-block",
                    fontSize : isEmphasized ? "55px" : "35px",
                    color: isEmphasized ? "orangered" : "#333",
                    fontWeight: isEmphasized ? "700" : "500",
                    fontStyle: isEmphasized ? "italic" : "none",
                  }}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h2>
        </Col>

        {/* Right - Video */}
        <Col md={7} className="text-center">
          <video
            src="/cmd.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ maxWidth: "100%", }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Video;
