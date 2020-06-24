import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

// This Demo should maybe called Problems
export default function Demo(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  });

  async function getData() {
    // ready to get users on the front
    const res = await Axios.get("/api/users");
    setUsers(res.data);
  }
  return (
    <div>
      <h1>Demo</h1>
      {users.map((u) => (
        <div>
          {u.email}-{u.id}
        </div>
      ))}
    </div>
  );
}
