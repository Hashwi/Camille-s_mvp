import React, { useEffect, useState } from "react";

function UserView() {
  const [quiz, setQuiz] = useState([]);

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


  const handleSubmit = event => {
    event.preventDefault();
    // addAnswer();
    showQuestionnaire(quiz[quiz.length -1].id +1);
  };

  const question = quiz[0].question;
  const answers = quiz.map(option => option.answer);

  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={handleSubmit}>
          <ul>
          {question}
            {answers.map((answer, index) => (
                <li className="quiz" key={option.id}>
                  {option.answer}
                </li>
            ))};
          </ul>
          <button type="submit">Submit</button>
        </form>
    </div>
  );
}


export default UserView;