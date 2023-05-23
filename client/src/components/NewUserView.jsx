import React, { useEffect, useState } from "react";

function UserView() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    showNextQuestion();
  }, []);

  
  const showNextQuestion = () => {
    fetch("/api/questions")
    .then(res => res.json())
    .then(question => {
      setQuestion(question);
    })
    . catch(error => {
    console.log(error)
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addAnswer();
    showNextQuestion();
  };


  return (
    <div>
        <h2>New here?</h2>
        <h3>Skin assessment</h3>
        <form onSubmit={e => handleSubmit(e)}>

          <button>Submit</button>
        </form>
    </div>
  );
}


export default UserView;