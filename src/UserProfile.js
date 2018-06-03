import React, { Component } from 'react';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {username: "", weight: 0.0};
        this.handleSave = this.handleSave.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
    }

    handleSave(event) {
        event.preventDefault();
        console.log(this.state);
    }

    handleUsernameChange(event) {
        console.log(event.target.value);
        this.setState({...this.state, username: event.target.value});
    }

    handleWeightChange(event) {
        console.log(event.target.value);
        this.setState({...this.state, weight: event.target.value});
    }

    render() {
        const username = this.state.username;
        const weight = this.state.weight;

        return (
            <div className="user-profile">
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
            </div>
        );
    }
}

export default UserProfile;
