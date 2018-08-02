import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  responseFacebook = async (response) => {
    console.log(response);
    let user;
    try {
      user = await fetch(`/api/user/${response.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      }).then(
        res => res.json()
      )
    } catch (err) {
      user = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response), 
      }).then(
        res => res.json()
      )
    }
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <FacebookLogin 
          appId="371809906684685"
          autoLoad={true}
          fields="name,picture"
          callback={this.responseFacebook}
        />
        {
          this.state.user ?
          <div>
            <h1>{this.state.user.name}</h1>
            <img src={`${this.state.user.url}`}/>
          </div> : <div/>
        }
      </div>
    );
  }
}

export default App;
