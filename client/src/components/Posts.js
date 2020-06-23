import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Posts(props) {
  const [myPosts, setMyPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await axios.get("/api/my_posts");
    setMyPosts(res.data);
    const res1 = await axios.get("/api/all_posts");
    setAllPosts(res1.data);
    const res2 = await axios.get("/api/all_users");
    setUsers(res2.data);
    const res3 = await axios.get("/api/get_current_user");
    setCurrentUser(res3.data);
    const res4 = await axios.get("/api/users_and_posts");
    console.log(res4.data);
    setUserPosts(res4.data);
  }

  return (
    <div>
      Current User
      <p>
        email:{currentUser.email} id: {currentUser.id}{" "}
      </p>
      Users:
      <br />
      {users.map((u) => (
        <p key={`u-${u.id}`}>
          email: {u.email} user id: {u.id}
        </p>
      ))}
      <hr />
      All Posts:
      {allPosts.map((p) => (
        <p key={`ap-${p.id}`}>
          post: {p.title}, user_id:{p.user_id}
        </p>
      ))}
      <br />
      My Posts:
      {myPosts.map((p) => (
        <p key={`aps-${p.id}`}>
          post: {p.title}, user_id:{p.user_id}
        </p>
      ))}
      <hr />
      User Post:
      {userPosts.map((p) => (
        <p key={`apus`}>
          post: {p.title}, email:{p.email}
        </p>
      ))}
      <hr />
    </div>
  );
}
