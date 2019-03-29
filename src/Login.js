import React, { Component } from 'react';
import "./Login.css";

class Login extends Component 
{
  render() 
  {
    return (
      <div id="container">
        <h2>Voting Authentication</h2>
        <br />
        <form id="info-form">
          Username: 
          <br />
          <input type="text" placeholder="Username" />
          <br />
          Alias:
          <br />
          <input type="text" placeholder="Name" />
          <br />
          Password:
          <br />
          <input type="password" placeholder="Password" />
          <br /><br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
