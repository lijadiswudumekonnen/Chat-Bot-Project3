import React, { useState } from "react";
import { askQuestion } from "../Component/apiService";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setAnswer("");
    setLoading(true);

    setSubmittedQuestion(question);

    try {
      const response = await askQuestion(question);
      setAnswer(response.text);
      setQuestion("");
    } catch (err) {
      setError("There was a problem getting the answer.");
      console.error(err);
    } finally {
      setLoading(false);
      setSubmittedQuestion("");
    }
  };

  return (
    <div className="question-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {loading && <div className="loading-gear">⚙</div>}
      {submittedQuestion && !loading && (
        <div className="message user-question">
          <p>{submittedQuestion}</p>
        </div>
      )}
      {answer && (
        <div className="message ai-answer ">
          <p>{answer}</p>
        </div>
      )}
      {error && <div className="message error-message">Error: {error}</div>}
    </div>
  );
};

export default QuestionForm;
