import React, { useEffect, useState } from "react";

function UserView() {
  const [quiz, setQuiz] = useState([]);
  const { question, answers } = quiz;

  useEffect(() => {
    showQuestionnaire(1);
  }, []);

  const showQuestionnaire = id => {
    fetch(`/api/questions/${id}`)
    .then(response => response.json())
    .then(data => {
      setQuiz(data);
    })
    . catch(error => {
    console.log(error)
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // addAnswer();
    showQuestionnaire(quiz[quiz.length -1].id +1);
  };


  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={handleSubmit}>
        <h4>{question}</h4>
          <ul>
            {answers.map((answer, index) => (
                <li className="quiz" key={index}>
                  {answer}
                </li>
            ))};
          </ul>
          <button type="submit">Submit</button>
        </form>
    </div>
  );
}


export default UserView;