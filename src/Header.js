import React, { Component } from 'react';
import logo from './logo.svg';
import MainMenu from './MainMenu';
import AnimatedRunner from './AnimatedRunner';

class Header extends Component {

    render() {
        return (
            <header>
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
