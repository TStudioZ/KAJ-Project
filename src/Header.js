import React, { Component } from 'react';
import logo from './logo.svg';
import MainMenu from './MainMenu';
import imgRunner1 from './runnerImg/runner_1.png';
import imgRunner2 from './runnerImg/runner_2.png';
import imgRunner3 from './runnerImg/runner_3.png';
import imgRunner4 from './runnerImg/runner_4.png';
import imgRunner5 from './runnerImg/runner_5.png';
import imgRunner6 from './runnerImg/runner_6.png';
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
