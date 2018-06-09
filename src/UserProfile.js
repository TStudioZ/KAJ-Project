import React from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading, MessageSaving } from './Messages';
import EditableField from './components/EditableField';
import ValidatingForm from './components/ValidatingForm';

class UserProfile extends ValidatingForm {

    constructor(props) {
        super(props);

        this.handleEditField = this.handleEditField.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validateWeight = this.validateWeight.bind(this);

        const user = { username: "", weight: 0.0 };
        const errors = { username: null, weight: null };

        this.state = { loading: true, saving: false, editing: false, errors: errors, data: user };
        SportsTrackerAPI.loadUser().then(user => {
            const userParsed = { username: user.username, weight: user.weight };
            this.setState({...this.state, loading: false, data: userParsed});
        });
    }

    handleEditField() {
        this.setState({...this.state, editing: true});
    }

    handleSaveImpl(event) {
        event.preventDefault();

        this.setState({...this.state, saving: true});
        const stateUser = this.state.data;
        let user = {username: stateUser.username, weight: stateUser.weight};
        SportsTrackerAPI.updateUser(user).then(res => {
            this.setState({...this.state, saving: false, editing: false});
        });
    }

    validateFieldsImpl(errors) {
        const user = this.state.data;
        errors["username"] = this.validateUsername(user.username);
        errors["weight"] = this.validateWeight(user.weight)
    }

    handleUsernameChange(username) {
        this.updateField("username", username, this.validateUsername, (u) => u.toString().trim());
    }

    handleWeightChange(weight) {
        this.updateField("weight", weight, this.validateWeight, (w) => parseFloat(w));
    }

    validateUsername(username) {
        username = username.toString().trim();
        const reg = /^[a-zA-Z]+[a-zA-Z0-9]*$/; 
        if (username.length === 0) {
            return "Cannot be empty";
        } else if (!username.match(reg)) {
            return "Wrong format";
        } else if (username.length > 20) {
            return "Can contain at most 20 characters"
        }
        return null;
    }

    validateWeight(weight) {
        if (weight.toString() === "") {
            return "Cannot be empty";
        }
        else if (weight <= 0) {
            return "Weight must be > 0";
        } else if (weight > 999) {
            return "Weight must be less than 1000 kg";
        }
        return null;
    }

    renderHeader() {
        return (
            <div className="form-header">
                Your profile
            </div>
        );
    }

    renderUserProfile() {
        const user = this.state.data;
        const username = user.username;
        const weight = user.weight;

        const errors = this.state.errors;

        return (
            <div className="form-wrapper">
                <ul className="form">
                    <EditableField
                        name="username"
                        type="text"
                        val={username}
                        onValueChange={this.handleUsernameChange.bind(this)}
                        error={errors["username"]}
                        onEdit={this.handleEditField}
                        label="Username:" />
                    <EditableField
                        name="weight"
                        type="number"
                        val={weight}
                        onValueChange={this.handleWeightChange.bind(this)}
                        error={errors["weight"]}
                        onEdit={this.handleEditField}
                        label="Weight (kg):" />
                    {this.state.editing &&
                        <li className="form-group">
                            <button onClick={this.handleSave.bind(this)} className="btn">Save</button>
                        </li>
                    }
                </ul>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        let contents;
        if (this.state.loading) {
            contents = MessageLoading;
        } else if (this.state.saving) {
            contents = MessageSaving;
        } else {
            contents = this.renderUserProfile();
        }

        return (
            <div className="user-profile-wrapper">
                {header}
                {contents}
            </div>
        );
    }
}

export default UserProfile;
