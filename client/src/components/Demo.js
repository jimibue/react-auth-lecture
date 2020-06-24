import React, { useState, useEffect, useContext } from "react";
import ProblemForm from "./ProblemForm";
import Axios from "axios";

// This Demo should maybe called Problems
export default function Demo(props) {
  const [users, setUsers] = useState([]);
  const [usersProblems, setUsersProblems] = useState([]);
  const [currentUser, setCurrentUser] = useState({ email: "", id: "" });
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    // ready to get users on the front
    try {
      const res = await Axios.get("/api/users");
      setUsers(res.data);
      const res1 = await Axios.get("/api/users_problems");
      console.log(res1);
      setUsersProblems(res1.data);

      const res2 = await Axios.get("/api/current_user_get");
      console.log(res2);
      setCurrentUser(res2.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleDelete(problemId) {
    const res = await Axios.delete(`/api/problems/${problemId}`);
    // setUsersProblems(usersProblems.filter((x) => x.id !== problemId));
    setUsersProblems(usersProblems.filter((x) => x.id !== res.data.id));
  }

  function handleEdit(thingThatWasEdit) {
    console.log(thingThatWasEdit);
  }
  function handleAdd(thingThatWasAdded) {
    console.log(thingThatWasAdded);
  }

  return (
    <div>
      <h1>Demo</h1>
      <h3>current user</h3>
      <div>
        {currentUser.email}-{currentUser.id}
      </div>
      <hr />
      <h3>all users</h3>
      {users.map((u) => (
        <div>
          {u.email}-{u.id}
        </div>
      ))}
      <hr />
      <h3>all users problems</h3>
      {usersProblems.map((u) => (
        <div>
          {u.email}-{u.question}
          {currentUser.id === u.user_id && (
            <>
              <span onClick={() => handleDelete(u.id)}>&nbsp; delete</span>
              <ProblemForm
                // {...u}
                answer={u.answer}
                question={u.question}
                id={u.id}
                edit={handleEdit}
              />
            </>
          )}
        </div>
      ))}
      <hr />
      <h3>add new problem</h3>
      <ProblemForm add={handleAdd} />
    </div>
  );
}
