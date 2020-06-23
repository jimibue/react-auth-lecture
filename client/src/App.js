import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import FetchUser from "./components/FetchUser";
import ProtectedRoute from "./components/ProtectedRoute";
import MyCats from "./components/MyCats";

function App() {
  return (
    <>
      <Navbar />
      <FetchUser>
        <Container>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/my_cats" component={MyCats} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </FetchUser>
    </>
  );
}

export default App;
