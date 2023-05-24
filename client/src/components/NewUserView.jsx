import React, { useEffect, useState } from "react";

function UserView() {
  const [quiz, setQuiz] = useState("");

  useEffect(() => {
    showQuestionnaire(1);
  }, []);

  
  const showQuestionnaire = id => {
    fetch(`/api/questionnaire/${id}`)
    .then(response => response.json())
    .then(data => {
      setQuiz(data);
    })
    . catch(error => {
    console.log(error)
    });
  };

  /* const handleSubmit = event => {
    event.preventDefault();
    addAnswer();
    showNextQuestion();
  }; */


  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={e => handleSubmit(e)}>
          {quiz.map(option => (
              <li className="quiz" key={option.id}>
                {option.question}
                {option.answer}
              </li>
          ))};
          <button>Submit</button>
        </form>
    </div>
  );
}


export default UserView;