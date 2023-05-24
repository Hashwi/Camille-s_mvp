import React, { useEffect, useState } from "react";

function UserView() {
  const [quiz, setQuiz] = useState({ question: "", answers: [] });
  const [selectedValues, setSelectedValues] = useState([]);
  const [isSelected, setIsSelected] = useState([]);

  useEffect(() => {
    showQuestionnaire(1);
  }, []);

  const showQuestionnaire = id => {
    fetch(`/api/questions/${id}/answers`)
    .then(response => response.json())
    .then(data => {
      setQuiz(data);
      setIsSelected(Array(data.answers.length).fill(false));
    })
    . catch(error => {
    console.log(error)
    });
  };

  const handleToggle = (index) => {
    setIsSelected((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (quiz.id === totalQuestions) {
      setSelectedValues([])
      setIsSelected(Array(quiz.answers.length).fill(false))
      showQuestionnaire(1)
    }
    
    const selected = [];
    isSelected.forEach((state, index) => {
      if (state) {
        selected.push(quiz.answers[index]);
      }
    });

    if (selected.length > 0) {
      setIsSelected([...selectedValues, ...selected]);
    }

    if (quiz.id < totalQuestions) {
      showQuestionnaire((quiz.id)+1);
    }
  };

  const { id, question, answers } = quiz;
  const totalQuestions = 5;

  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>
              {id}. {question}
            </h4>
            <ul>
              {answers.map((answer, index) => (
                <li key={answers[index]}>
                  <button 
                      className={isSelected? "selected" : ""} 
                      onClick={()=>handleToggle(index)}
                  >{answer}</button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit">Submit</button>
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