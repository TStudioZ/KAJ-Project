import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';

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

    handleUsernameChange(event) {
        console.log(event.target.value);
        this.setState({...this.state, username: event.target.value});
    }

    handleWeightChange(event) {
        console.log(event.target.value);
        this.setState({...this.state, weight: event.target.value});
    }

    renderUserProfile() {
        const username = this.state.username;
        const weight = this.state.weight;

        return (
            <form onSubmit={this.handleSave}>
                <div className="form-header">Your profile</div>
                <ul className="form-wrapper">
                    <li className="form-group">
                        <label htmlFor="username">Username:</label>
                        <div className="form-input-edit">
                            <input type="text" className="form-control" name="username" 
                                value={username} onChange={this.handleUsernameChange} />
                            <button type="submit" className="btn-small">Edit</button>
                        </div>
                    </li>
                    <li className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <div className="form-input-edit">
                            <input type="number" min="0" step="0.1" className="form-control" name="weight" 
                                value={weight} onChange={this.handleWeightChange} />
                            <button type="submit" className="btn-small">Edit</button>
                        </div>
                    </li>
                    <li className="form-group">
                        <button type="submit" className="btn">Save</button>
                    </li>
                </ul>
            </form>
        );
    }

    render() {

        let contents = this.state.loading ? MessageLoading : this.renderUserProfile();

        return (
            <div className="user-profile">
                {contents}
            </div>
        );
    }
}

export default UserProfile;
