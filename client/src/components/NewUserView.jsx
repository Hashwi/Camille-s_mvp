import React, { useEffect, useState } from "react";

function UserView() {
  const [questionnaire, setQuestionnaire] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    showQuestionnaire();
  }, []);

  
  const showQuestionnaire = () => {
    fetch("/api/questionnaire")
    .then(response => response.json())
    .then(questionnaire => {
      setQuestionnaire(questionnaire);
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

          <button>Submit</button>
        </form>
    </div>
  );
}


export default UserView;