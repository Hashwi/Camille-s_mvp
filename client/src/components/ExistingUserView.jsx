import React, { useState } from "react";

function AdminView() {
  

  return (
    <div>
        <h2>Admin View</h2>
        <form>
            <input className="userID" type="text" placeholder="Username" />
            <input className="userPW" type="text" placeholder="Password"/>
        </form>
    </div>
  );
}

export default AdminView;