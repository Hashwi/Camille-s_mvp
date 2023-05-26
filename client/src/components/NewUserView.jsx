import React, { useEffect, useState } from "react";


function UserView() {
  const [quiz, setQuiz] = useState({ id:0, question: "", answers: [] });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [quizResults, setQuizResults] = useState([]);
  const { id, question, answers } = quiz;
  const totalQuestions = 5;



  useEffect(() => {
    showQuestionnaire(1);
  }, []);

  const showQuestionnaire = id => {
    fetch(`/api/questions/${id}/answers`)
    .then(response => response.json())
    .then(data => {
      setQuiz(data);
    })
    . catch(error => {
    console.log(error)
    });
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (quiz.id === 3 && selectedAnswers.length < 3) {
      setSelectedAnswers([...selectedAnswers, answer]);
    } else if (quiz.id !== 3) {
      setSelectedAnswers([answer]);
    }
  }

  const onClickNext = event => {
    event.preventDefault();
    setSelectedAnswerIndex(null);

    const result = { id, question, answer: selectedAnswers.join(", ") };
    const newResults = [...quizResults, result];

    if (selectedAnswers.length === 0) {
      alert("Please select an answer.");
      return;
    }
    if (quiz.id === 3 && selectedAnswers.length > 3) {
      alert("Please select 3 concerns.");
      return;
    } 
    if (quiz.id !== 3 && selectedAnswers.length > 1) {
      alert("Please select one answer only.");
      return;
    }

    if (quiz.id !== totalQuestions) {
      showQuestionnaire((quiz.id) +1);
      setQuizResults(newResults);
      setSelectedAnswers([]);
    } else {
      alert(`Your answers are: ${newResults.map((result) => result.question + " " + result.answer).join(" \n ")}.`);      
      setQuizResults([]);
      showQuestionnaire(1);
    }
  }

  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={onClickNext}>
          <div>
            <h4>
              {id}. {question}
            </h4>
            <ul className="answersContainer">
              {answers.map((answer, index) => (
                <li key={answers[index]}>
                  <button 
                      type="button"
                      className={quiz.id === 3 && selectedAnswers.includes(answer) ? 'selected' : null ||
                        selectedAnswerIndex === index ? 'selected' : null} 
                      onClick={() => onAnswerSelected(answer, index)}
                  >{answer}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="submitBtn">
            <button type="submit" disabled={selectedAnswerIndex === null}>
              {quiz.id >= totalQuestions ? 'Finish' : 'Next'}
            </button>
          </div>
        </form>
        <div>
          <h4>Your answers are:</h4>
          {quizResults.map((result, index) => (
          <p key={index}>
            {result.question}
            <br/>
            {result.answer}
          </p>
          ))}
        </div>
    </div>
  );
}


export default UserView;