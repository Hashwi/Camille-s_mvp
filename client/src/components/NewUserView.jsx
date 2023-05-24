import React, { useEffect, useState } from "react";

function UserView() {
  const [quiz, setQuiz] = useState({ question: "", answers: [] });
  const [finish, setFinish] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);

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

  const handleResponse = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    };
  }

  const handleSubmit = event => {
    event.preventDefault();
    // addAnswer();
    showQuestionnaire((quiz.id)+1);
  };
  const { id, question, answers } = quiz;

  const finishHandler = () => {
    if (currentQuestion === data.length - 1) {
      setFinish(true);
      //showResult()
    }
  };


  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form>
          <div>
            <h4>{id}. {question}</h4>
                {answers.map((answer, index) => (
                    <button className={selectedValues.includes(answer) ? "selected" : ""} key={index} onClick={handleResponse(answer)}>
                      {answer}
                    </button>
                ))}
            </div>
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  );
}


export default UserView;