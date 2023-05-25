import React, { useEffect, useState } from "react";


function UserView() {
  const [quiz, setQuiz] = useState({ question: "", answers: [] });
  const [selectedValues, setSelectedValues] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
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
    setIsSelected(!isSelected);
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    if (selectedValues.length === 0) {
      alert("Please select an answer.");
      return;
    }
    if (quiz.id === totalQuestions) {
      alert(`Your answers are ${selectedValues.join(", ")}.`);
      setSelectedValues([]);
      showQuestionnaire(1);
    }
    if (quiz.id < totalQuestions) {
      showQuestionnaire((quiz.id) + 1);
    }
  };


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
          {selectedValues.map((value, index) => (
                <p key={index}>{value}</p>
              ))}
        </div>
    </div>
  );
}


export default UserView;