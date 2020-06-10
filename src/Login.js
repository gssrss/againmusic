import React, { Component } from "react";
//import { Link } from "react-router-dom"
import fire from "./config/fire";

import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  login(e) {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch((error) => {
        if (error) {
          this.setState({
            error: error.message,
          });
        }
        // console.log(error);
      });
  }

  signup(e) {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)

      .catch((error) => {
        if (error) {
          this.setState({
            error: error.message,
          });
        }
        //console.log(error.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const error = this.state.error;

    return (
      <Container className="App-container">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>
                <b>Email</b>
              </Label>
              <Input
                value={this.state.email}
                onChange={this.handleChange}
                type="email"
                name="email"
                id="exampleEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <p className="error">{error}</p>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">
                <b>Password</b>
              </Label>
              <Input
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                name="password"
                id="examplePassword"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button type="submit" onClick={this.login}>
            Login
          </Button>
          <Button onClick={this.signup} style={{ marginLeft: "25px" }}>
            Signup
          </Button>{" "}
        </Form>
      </Container>
    );
  }
}
export default Login;
