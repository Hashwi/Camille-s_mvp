const express = require('express');
const router = express.Router();
const db = require("../model/helper");
const { sign } = require('jsonwebtoken');


// GET one user
// router.get("/profile", async function(req, res, next){

//   const { id } = req.params;
//   try {
//     const results = await db(`SELECT * FROM users WHERE id = ${id}`);
//     if (results.data.length) {
//       res.send(results.data[0]);
//     } else res.status(404).send({ message: "User was not found" });
//   } catch (err) {
//     res.status(500).send({ message: err });
//   }
// })


router.post('/login', async function(req, res, next) {
  const {userName, password} = req.body;
  try{
   const results = await db
   (`SELECT id, user_name, name FROM users WHERE user_name ='${userName}' and password ='${password}';`)
   if(results.data.length){
    const user = results.data[0]
    let token =  sign({ user_name: user.user_name, name: user.name, id: user.id }, process.env.JWT_SECRET)
    user.token = token
    console.log(user)
    console.log(token)
    res.send( 
      {user}
      
    )
   } else {
    res.status(404).send("User not found" )
  }
   
  } catch(err){
    res.status(500).send({ message: err }); 
  }
  
});



module.exports = router;


