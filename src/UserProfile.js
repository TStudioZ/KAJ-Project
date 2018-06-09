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
        this.validateAge = this.validateAge.bind(this);
        this.validateWeight = this.validateWeight.bind(this);
        this.validateHeight = this.validateHeight.bind(this);

        const user = { username: "", age: 0, weight: 0.0, height: 0 };
        const errors = { username: null, age: null, weight: null, height: null };

        this.state = { loading: true, saving: false, editing: false, errors: errors, data: user };
        SportsTrackerAPI.loadUser().then(user => {
            const userParsed = { username: user.username, age: user.age, weight: user.weight, height: user.height };
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
        let user = {username: stateUser.username, age: stateUser.age, weight: stateUser.weight, height: stateUser.height};
        SportsTrackerAPI.updateUser(user).then(res => {
            this.setState({...this.state, saving: false, editing: false});
        });
    }

    validateFieldsImpl(errors) {
        const user = this.state.data;
        errors["username"] = this.validateUsername(user.username);
        errors["age"] = this.validateAge(user.age);
        errors["weight"] = this.validateWeight(user.weight);
        errors["height"] = this.validateHeight(user.height);
    }

    handleUsernameChange(username) {
        this.updateField("username", username, this.validateUsername, (u) => u.toString().trim());
    }

    handleAgeChange(age) {
        this.updateField("age", age, this.validateAge, (a) => a);
    }

    handleWeightChange(weight) {
        this.updateField("weight", weight, this.validateWeight, (w) => parseFloat(w));
    }

    handleHeightChange(height) {
        this.updateField("height", height, this.validateHeight, (h) => h);
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

    validateAge(age) {
        const ageString = age.toString();
        const reg = /^[0-9]+$/
        if (ageString === "" || !ageString.match(reg)) {
            return "Wrong age format";
        } else if (age <= 12) {
            return "Age must be over 13";
        } else if (age > 199) {
            return "Age must be less than 200";
        }
        return null;
    }

    validateWeight(weight) {
        if (weight.toString() === "") {
            return "Cannot be empty";
        } else if (weight <= 0) {
            return "Weight must be more than 0 kg";
        } else if (weight > 999) {
            return "Weight must be less than 1000 kg";
        }
        return null;
    }

    validateHeight(height) {
        const heightString = height.toString();
        const reg = /^[0-9]+$/
        if (heightString === "" || !heightString.match(reg)) {
            return "Wrong height format";
        } else if (height <= 0) {
            return "Height must be more than 0 cm";
        } else if (height > 299) {
            return "Height must be less than 300 cm";
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
        const age = user.age;
        const weight = user.weight;
        const height = user.height;

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
                        name="age"
                        type="number"
                        val={age}
                        onValueChange={this.handleAgeChange.bind(this)}
                        error={errors["age"]}
                        onEdit={this.handleEditField}
                        label="Age:" />
                    <EditableField
                        name="weight"
                        type="number"
                        val={weight}
                        onValueChange={this.handleWeightChange.bind(this)}
                        error={errors["weight"]}
                        onEdit={this.handleEditField}
                        label="Weight (kg):" />
                    <EditableField
                        name="height"
                        type="number"
                        val={height}
                        onValueChange={this.handleHeightChange.bind(this)}
                        error={errors["height"]}
                        onEdit={this.handleEditField}
                        label="Height (cm):" />
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
