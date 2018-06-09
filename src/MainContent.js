import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';

class MainContent extends Component {

    constructor(props) {
        super(props);

        this.state = {loading: true, user: null};
        SportsTrackerAPI.loadUser().then(u => {
            this.setState({loading: false, user: u});
        });
    }

    renderContent() {
        let username = this.state.user.username;

        return (
            <div className="main-area">
                <div className="main-area-username">
                    Hi, {username}!
                </div>
                <div className="main-area-stats">
                    <div className="main-area-stats-header">
                        Here are your stats:
                    </div>
                    <ul className="main-area-stats-content">
                        <li className="stats-time">
                            <ul>
                                <li className="main-area-stats-content-time-label">
                                    Total tracked time:
                                </li>
                                <li className="main-area-stats-content-time-value">
                                    999
                                </li>
                            </ul>
                        </li>
                        <li className="stats-distance">
                            <ul>
                                <li className="main-area-stats-content-distance-label">
                                    Total tracked distance (km):
                                </li>
                                <li className="main-area-stats-content-distance-value">
                                    999
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="area-header">
                Welcome back
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        let contents = this.state.loading ? MessageLoading : this.renderContent();

        return (
            <div className="main-content">
                <div className="main-area-wrapper">
                    {header}
                    {contents}
                </div>
            </div>
        );
    }
}

export default MainContent;
