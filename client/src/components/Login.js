import React, { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Button, Form, Segment, Header } from "semantic-ui-react";

export default function Login(props) {
  const { handleLogin } = useContext(AuthContext);
  function handleSubmit(e) {
    handleLogin({ email, password }, props.history);
  }
  const [email, setEmail] = useState("default");
  const [password, setPassword] = useState("");
  return (
    <Segment basic>
      <Header as="h1" textAlign="center">
        Login
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Email"
          autoFocus
          required
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label="Password"
          required
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Segment textAlign="center" basic>
          <Button primary type="submit">
            Submit
          </Button>
        </Segment>
      </Form>
    </Segment>
  );
}
