import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Container, Button, Modal, Spinner } from "react-bootstrap";
import { MainContext } from "../context/MainContext";
import { languageQuestions } from "./languageQuestions"; // ⬅️ Make sure this path is correct

const QuizPage = () => {
  const { user, backendurl } = useContext(MainContext);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
  const loadQuiz = async () => {
  try {
    const { data } = await axios.get(`${backendurl}/api/course/listcourse`);
    const userCourses = user.course || [];

    // Extract course_name and match with user's course list
    const matchedCourses = data.courses.filter(course =>
      userCourses.includes(course.course_name)
    );

    // Extract all unique languages across matched courses
    const allLangs = [...new Set(matchedCourses.flatMap(c => c.languages))];

    // Collect 30 questions per language
    const collectedQuestions = allLangs.flatMap(lang => {
      const base = languageQuestions[lang] || [];
      return base.map(q => ({ ...q, lang }));
    });

    // Shuffle and select 20
    const shuffled = collectedQuestions.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 20);
    setQuestions(selected);
  } catch (err) {
    console.error("Failed to load quiz:", err);
  } finally {
    setLoading(false);
  }
};


    loadQuiz();
  }, [backendurl, user]);

  const handleAnswerChange = (qIndex, option) => {
    setUserAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) correct++;
    });
    setScore(correct);
    setShowModal(true);
  };

  if (loading) return <Spinner animation="border" className="m-5" />;

  return (
    <Container className="mt-5 mb-5">
      <h3>Combined Quiz Based on Your Courses</h3>
      {questions.map((q, i) => (
        <div key={i} className="mb-4 p-3 border rounded shadow-sm">
          <strong>Q{i + 1} ({q.lang}):</strong> {q.question}
          {q.options.map((opt, j) => (
            <div key={j} className="form-check">
              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                className="form-check-input"
                checked={userAnswers[i] === opt}
                onChange={() => handleAnswerChange(i, opt)}
                required
              />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
        </div>
      ))}

      <Button
        variant="primary"
        onClick={handleSubmit}
        disabled={Object.keys(userAnswers).length !== questions.length}
      >
        Submit Quiz
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Test Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Your Score: {score} / {questions.length}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default QuizPage;
