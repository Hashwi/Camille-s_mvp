import React, { useState } from "react";

function AdminView() {
  

  return (
    <div>
        <h2>Welcome back!</h2>
        <form className="loginForm">
            <input className="userID" type="text" placeholder="Username" />
            <input className="userPW" type="text" placeholder="Password"/>
            <br/>
            <button className="loginBtn">Login</button>
        </form>
    </div>
  );
}

export default AdminView;