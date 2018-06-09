import React, { Component } from 'react';
import logo from './logo.svg';
import MainMenu from './MainMenu';
import AnimatedRunner from './AnimatedRunner';

class Header extends Component {

    constructor(props) {
        super(props);

        this.onOnline = this.onOnline.bind(this);
        this.onOffline = this.onOffline.bind(this);

        this.state = { online: navigator.onLine };
    }

    onOnline() {
        this.setState({...this.state, online: true});
    }

    onOffline() {
        this.setState({...this.state, online: false});
    }

    componentDidMount() {
        window.addEventListener("online", this.onOnline);
        window.addEventListener("offline", this.onOffline);
    }

    componentWillUnmount() {
        window.removeEventListener("online", this.onOnline);
        window.removeEventListener("offline", this.onOffline);
    }

    render() {
        return (
            <header>
                {!this.state.online &&
                    <div className="header-offline-msg">
                        You are offline.
                    </div>
                }
                <div className="header-wrapper">
                    <AnimatedRunner />
                    <div className="header-logo">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to Sports Tracker</h1>
                    </div>
                </div>
                <MainMenu />
            </header>
        );
    }
}

export default Header;
