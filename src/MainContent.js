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
            <div>
                Hi, {username}
            </div>
        );
    }

    render() {
        let contents = this.state.loading ? MessageLoading : this.renderContent();

        return (
            <div className="App-intro">
                {contents}
            </div>
        );
    }
}

export default MainContent;
