import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import Axios from "axios";

export default function ProblemForm(props) {
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState(
    props.question ? props.question : ""
  );
  const [answer, setAnswer] = useState(props.answer ? props.answer : "");

  async function whatEver(e) {
    // if ths add or edit
    console.log("ckicked");
    const data = { question: question, answer: answer };
    if (props.id) {
      let res = await Axios.put(`/api/problems/${props.id}`, data);
      props.edit(res.data);
    } else {
      let res = await Axios.post(`/api/problems`, data);
      props.add(res.data);
    }
  }

  if (showForm) {
    console.log(showForm);
    return (
      <Form onSubmit={whatEver}>
        <Form.Input
          value={question}
          label={"question"}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Form.Input
          value={answer}
          label={"answer"}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Form.Button>submit</Form.Button>
      </Form>
    );
  } else {
    return <Button onClick={() => setShowForm(true)}>show Form</Button>;
  }
}
