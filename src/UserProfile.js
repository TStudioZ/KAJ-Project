import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';
import EditableField from './components/EditableField';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {loading: true, username: "", weight: 0.0};
        SportsTrackerAPI.loadUser().then(user => {
            this.setState({loading: false, username: user.username, weight: user.weight});
        });

        this.handleSave = this.handleSave.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleSave(event) {
        event.preventDefault();
        console.log(this.state);

        this.setState({...this.state, loading: true});
        let user = {username: this.state.username, weight: this.state.weight};
        SportsTrackerAPI.updateUser(user).then(res => {
            this.setState({...this.state, loading: false});
        });
    }

    handleUsernameChange(username) {
        console.log(username);
        this.setState({...this.state, username: username});
    }

    handleWeightChange(event) {
        console.log(event.target.value);
        this.setState({...this.state, weight: event.target.value});
    }

    renderUserProfile() {
        const username = this.state.username;
        const weight = this.state.weight;

        return (
            <div>
                <div className="form-header">Your profile</div>
                <ul className="form-wrapper">
                    <EditableField
                        name="username"
                        type="text"
                        val={username}
                        onValueChange={this.handleUsernameChange}
                        label="Username:" />
                    <li className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <div className="form-input-edit">
                            <input type="number" min="0" step="0.1" className="form-control" name="weight" 
                                value={weight} onChange={this.handleWeightChange} />
                            <button type="submit" className="btn-small">Edit</button>
                        </div>
                    </li>
                    <li className="form-group">
                        <button onClick={this.handleSave} className="btn">Save</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const contents = this.state.loading ? MessageLoading : this.renderUserProfile();

        return (
            <div className="user-profile">
                {contents}
            </div>
        );
    }
}

export default UserProfile;
