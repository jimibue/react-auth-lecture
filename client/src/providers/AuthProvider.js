import React from "react";
import axios from "axios";

// create the context
export const AuthContext = React.createContext();

// create the consumer
export const AuthConsumer = AuthContext.Consumer;

// create the provider
export default class AuthProvider extends React.Component {
  state = { user: null };

  handleRegister = (user, history) => {
    console.log("handleRegister called");
    // here I want to do axios call to register a user
    // user email, password, passwordConfirmation, confirm_success_url?
    axios
      .post("/api/auth", user)
      .then((res) => {
        // res.headers['access-token'] there is my token
        // res.data.data was my user
        this.setState({ user: res.data.data });
        history.push("/");
        // here I want to go to the home page
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid login attempt");
      });

    // then I want redirect/go to home page on successful register
  };

  // define handle login, I define this once
  // i can call it as many times as I want but I am expecting to becalled
  // with the first param as a object {email:'', password}
  // second param is react route dom history object
  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then((res) => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        alert("Invalid login attempt");
      });
  };

  handleLogout = (history) => {
    axios
      .delete("/api/auth/sign_out")
      .then((res) => {
        console.log(res);
        this.setState({ user: null });
        history.push("/login");
      })
      .catch((err) => {
        alert("Logout failed");
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          handleLogin: this.handleLogin,
          handleRegister: this.handleRegister,
          handleLogout: this.handleLogout,
          setUser: (user) => this.setState({ user }),
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
