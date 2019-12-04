import React from 'react';
import jwt from 'jsonwebtoken';

//create 2 things: context (JS obj) a collection of things avail to any subscribing component
//the login wrapper is a react component. It wraps around teh topmost parent of the context.


export const LoginContext = React.createContext();

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false, 
      doLogin: this.doLogin
    }
  }

    doLogin = (username, password) => {
      console.log(`logging in as ${username} with pw ${password}`);
      fetch('http://api-js401.herokuapp.com/signin', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: new Headers({
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`
        })
      })
      .then(res => res.text())
      .then(token => this.validateToken(token))
      .catch(console.error)
    }

    validateToken = token => {
      let user = jwt.verfy(token, process.env.REACT_APP_SECRET)
    }
  
  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    )
  }
}
export default LoginWrapper;