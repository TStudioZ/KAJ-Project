import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';
import Helper from './Helper';

/**
 * Represents the Home tab.
 */
class MainContent extends Component {

    constructor(props) {
        super(props);

        // set state to loading
        this.state = {loading: true, user: null, totalDistance: 0, totalTime: 0};
        // wait until all data is loaded
        Promise.all([
            SportsTrackerAPI.loadUser(),
            SportsTrackerAPI.getTotalDistance(),
            SportsTrackerAPI.getTotalTime()
        ]).then(([user, distance, time]) => {
            // all data loaded, set loading to false and put the data to the state
            this.setState({loading: false, user: user, totalDistance: distance, totalTime: time});
        });
    }

    renderContent() {
        const username = this.state.user.username;
        const distance = this.state.totalDistance;
        const time = Helper.toTimeString(this.state.totalTime);

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
                                    {time}
                                </li>
                            </ul>
                        </li>
                        <li className="stats-distance">
                            <ul>
                                <li className="main-area-stats-content-distance-label">
                                    Total tracked distance (km):
                                </li>
                                <li className="main-area-stats-content-distance-value">
                                    {distance}
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
