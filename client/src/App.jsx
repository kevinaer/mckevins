import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    responseFacebook = async (response) => {
        let user;
        try {
            user = await fetch(`/api/user/${response.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }).then(res => res.json());
        } catch (err) {
            user = await fetch('/api/user/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(response),
            }).then(res => res.json());
        }
        this.setState({ user });
    }

    render() {
        const { user } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">
                        Welcome to React
                    </h1>
                </header>
                <FacebookLogin
                  appId="371809906684685"
                  autoLoad
                  fields="name,picture"
                  callback={this.responseFacebook}
                />
                {user && (
                    <div>
                        <h1>
                            {user.name}
                        </h1>
                        <img src={`${user.url}`} alt="profile" />
                    </div>
                )}
            </div>
        );
    }
}

export default App;
