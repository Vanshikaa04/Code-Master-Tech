import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "../User/css/Home.css"
import {motion } from "framer-motion"
const allQuestions = [
  {
    question: "What is the output of `print(2 ** 3)` in Python?",
    options: ["6", "8", "9", "Error"],
    answer: "8",
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<image>", "<pic>", "<img>", "<src>"],
    answer: "<img>",
  },
  {
    question: "In Java, which keyword is used to inherit a class?",
    options: ["inherits", "extends", "implement", "super"],
    answer: "extends",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
      "Creative Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which SQL clause is used to filter records?",
    options: ["SELECT", "WHERE", "GROUP BY", "FROM"],
    answer: "WHERE",
  },
  {
    question: "Which of these is not a primitive data type in Java?",
    options: ["int", "String", "char", "boolean"],
    answer: "String",
  },
  {
    question: "What does 'ls' command do in Bash?",
    options: ["List files", "Login shell", "Locate service", "Launch script"],
    answer: "List files",
  },
  {
    question: "Which JavaScript method is used to write to the console?",
    options: ["print()", "write()", "console.write()", "console.log()"],
    answer: "console.log()",
  },
  {
    question: "Which keyword is used to define a constant in JavaScript?",
    options: ["var", "let", "const", "define"],
    answer: "const",
  },
  {
    question: "Which symbol is used for single-line comments in Python?",
    options: ["//", "#", "<!-- -->", "--"],
    answer: "#",
  },
  {
    question: "Which C++ header is needed for input/output operations?",
    options: [
      "#include <iostream>",
      "#include <stdio.h>",
      "#include <conio.h>",
      "#include <stdlib.h>",
    ],
    answer: "#include <iostream>",
  },
  {
    question: "Which of these is a backend JavaScript framework?",
    options: ["Vue", "React", "Node.js", "Angular"],
    answer: "Node.js",
  },
  {
    question: "What is the default file extension for a Python file?",
    options: [".py", ".pt", ".pyt", ".python"],
    answer: ".py",
  },
  {
    question: "In SQL, what does the COUNT() function do?",
    options: [
      "Counts columns",
      "Counts rows",
      "Counts characters",
      "Counts tables",
    ],
    answer: "Counts rows",
  },
  {
    question: "Which operator is used for equality in JavaScript?",
    options: ["=", "==", "===", "!="],
    answer: "===",
  },
  {
    question: "Which Git command is used to upload code to a remote repo?",
    options: ["git upload", "git push", "git commit", "git init"],
    answer: "git push",
  },
  {
    question: "Which of these is a statically typed language?",
    options: ["JavaScript", "Python", "TypeScript", "Ruby"],
    answer: "TypeScript",
  },
  {
    question: "Which symbol is used to dereference a pointer in C?",
    options: ["&", "*", "#", "%"],
    answer: "*",
  },
  {
    question: "In React, what is a Hook?",
    options: [
      "A class",
      "A built-in method",
      "A function to use state/lifecycle",
      "A keyword",
    ],
    answer: "A function to use state/lifecycle",
  },
  {
    question: "Which method is used to read user input in Python 3?",
    options: ["scanf()", "cin", "input()", "read()"],
    answer: "input()",
  },
  {
    question: "Which of these is used to define an interface in Java?",
    options: ["interface", "class", "object", "struct"],
    answer: "interface",
  },
  {
    question: "Which tag creates a numbered list in HTML?",
    options: ["<ul>", "<ol>", "<list>", "<dl>"],
    answer: "<ol>",
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Query Language",
      "Server Query Language",
      "Strong Question Language",
      "Simple Query Logic",
    ],
    answer: "Structured Query Language",
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django",
  },
  {
    question: "How do you declare a function in Python?",
    options: [
      "function myFunc()",
      "def myFunc():",
      "function:myFunc",
      "def myFunc{}",
    ],
    answer: "def myFunc():",
  },
  {
    question: "Which keyword in Java creates an object?",
    options: ["create", "instance", "new", "object"],
    answer: "new",
  },
  {
    question: "Which protocol is used by REST APIs?",
    options: ["SMTP", "HTTP", "FTP", "SNMP"],
    answer: "HTTP",
  },
  {
    question: "Which of the following is not a loop in C?",
    options: ["for", "while", "repeat", "do...while"],
    answer: "repeat",
  },
  {
    question: "Which is used to style a React component inline?",
    options: ["className", "style={{}}", "css={}", "id='style'"],
    answer: "style={{}}",
  },
  {
    question: "Which of these languages is used for statistical analysis?",
    options: ["R", "Ruby", "Rust", "Ring"],
    answer: "R",
  },
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffledQuestions = shuffle(allQuestions).slice(0, 20);
    setQuestions(shuffledQuestions);
  }, []);

  const handleOptionChange = (qIndex, option) => {
    setUserAnswers({ ...userAnswers, [qIndex]: option });
  };
  const allAnswered = (userAnswers, totalQuestions) => {
    return Object.keys(userAnswers).length === totalQuestions;
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) correct++;
    });
    setScore(correct);
    setShowModal(true);
  };

  return (
    <div className="w-100 h-100 ">
    <Container fluid className="py-4 w-75 " >
          <motion.h1
      className="section-title text-center"
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Boost Your  <span className="extra">Confidence</span>
    </motion.h1>

      {questions.map((q, idx) => (
  <motion.div
    key={idx}
    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.2 }}
  >
    <Card className="mb-3" style={{ backgroundColor: "var(--bgcolor2)" }}>
      <Card.Body>
        <Card.Title>
          {idx + 1}. {q.question}
        </Card.Title>
        <Form>
          {q.options.map((opt, i) => (
            <Form.Check
              key={i}
              type="radio"
              name={`question-${idx}`}
              label={opt}
              value={opt}
              checked={userAnswers[idx] === opt}
              onChange={() => handleOptionChange(idx, opt)}
              required
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  </motion.div>
))}

      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={!allAnswered(userAnswers, questions.length)}
style={{backgroundColor:"red"}}
          >
            Submit Quiz
          </Button>{" "}
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Your Score: {score} / {questions.length}
          </h4>
          <p>{score >= 15 ? "🎉 Great job!" : "Keep practicing!"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
};

export default Quiz;
