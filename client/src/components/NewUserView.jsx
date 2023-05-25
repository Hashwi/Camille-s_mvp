import React, { useEffect, useState } from "react";


function UserView() {
  const [quiz, setQuiz] = useState({ id:0, question: "", answers: [] });
  const [selectedValues, setSelectedValues] = useState([]);
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

  const handleSelect = (answer) => {
    if (selectedValues.includes(answer)) {
      setSelectedValues(selectedValues.filter(value => value !== answer));
    } else {
      setSelectedValues([...selectedValues, answer]);
    }
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const result = { id, question, answer: selectedValues.join(", ") };

    if (selectedValues.length === 0) {
      alert("Please select an answer.");
      return;
    }
    if (quiz.id === 3 && selectedValues.length > 3) {
      alert("Please select maximum 3 concerns.");
      return;
    } 
    if (quiz.id !== 3 && selectedValues.length > 1) {
      alert("Please select one answer only.");
      return;
    }

    if (quiz.id === totalQuestions) {
      alert(`Your answers are: ${quizResults.map((result) => result.question + " " + result.answer).join(" \n ")}.`);      
      setSelectedValues([]);
      setQuizResults([]);
      showQuestionnaire(1);
    };

    setQuizResults([...quizResults, result]);
    setSelectedValues([]);
    showQuestionnaire((quiz.id) +1);
    console.log(quiz.id)
  }

  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <h4>
              {id}. {question}
            </h4>
            <ul className="answersContainer">
              {answers.map((answer, index) => (
                <li key={answers[index]}>
                  <button 
                      type="button"
                      className={selectedValues.includes(answer) ? "selected" : ""} 
                      onClick={() => handleSelect(answer)}
                  >{answer}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="submitBtn">
            <button type="submit">Submit</button>
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