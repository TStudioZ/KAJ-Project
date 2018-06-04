import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';
import EditableField from './components/EditableField';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: true, username: "", weight: 0.0 };
        SportsTrackerAPI.loadUser().then(user => {
            this.setState({loading: false, username: user.username, weight: user.weight});
        });

        this.handleSave = this.handleSave.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleSave(event) {
        event.preventDefault();

        this.setState({...this.state, loading: true});
        let user = {username: this.state.username, weight: this.state.weight};
        SportsTrackerAPI.updateUser(user).then(res => {
            this.setState({...this.state, loading: false});
        });
    }

    handleUsernameChange(username) {
        this.setState({...this.state, username: username});
    }

    handleWeightChange(weight) {
        this.setState({...this.state, weight: weight});
    }

    renderHeader() {
        const isEdit = this.state.id > 0;
        return (
            <div className="form-header">
                Your profile
            </div>
        );
    }

    renderUserProfile() {
        const username = this.state.username;
        const weight = this.state.weight;

        return (
            <div className="form-wrapper">
                <ul className="form">
                    <EditableField
                        name="username"
                        type="text"
                        val={username}
                        onValueChange={this.handleUsernameChange}
                        label="Username:" />
                    <EditableField
                        name="weight"
                        type="number"
                        val={weight}
                        onValueChange={this.handleWeightChange}
                        label="Weight:" />
                    <li className="form-group">
                        <button onClick={this.handleSave} className="btn">Save</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        const contents = this.state.loading ? MessageLoading : this.renderUserProfile();

        return (
            <div className="user-profile-wrapper">
                {header}
                {contents}
            </div>
        );
    }
}

export default UserProfile;
