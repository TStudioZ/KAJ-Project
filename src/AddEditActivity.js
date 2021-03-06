import React from 'react';
import { withRouter } from 'react-router-dom';
import LabeledField from './components/LabeledField';
import LabeledDropdown from './components/LabeledDropdown';
import SportsTrackerAPI, { SportActivity } from './SportsTrackerAPI';
import * as Messages from './Messages';
import LabeledDateInput from './components/LabeledDateInput';
import Helper from './Helper';
import ValidatingForm from './components/ValidatingForm';
import successSound from './sounds/bicycle-horn-1.wav';

/**
 * Handles creation and editing of activities.
 */
class AddEditActivity extends ValidatingForm {

    constructor(props) {
        super(props);

        this.createDefaultActivity = this.createDefaultActivity.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.validateDistance = this.validateDistance.bind(this);

        const id = this.props.match.params.id;
        const dropdownSportTypes = SportsTrackerAPI.getSportTypes();
        const data = this.createDefaultActivity(id);

        let errors = { date: null, time: null, distance: null };
        this.state = { saving: false, errors: errors, dropdownSportTypes: dropdownSportTypes, data: data };
           
        if (id > 0) {
            // if there is an existing activity to be edited, load it
            this.state = { ...this.state, loading: true, id: id };
            SportsTrackerAPI.getActivity(id).then(a => {
                this.setState({...this.state, loading: false, data: a});
            });
        } else {
            // otherwise start with a new default activity
            this.state = { ...this.state, loading: false, id: -1 };
        }
    }

    createDefaultActivity(id) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return new SportActivity(id, "Running", d, 0, 0);
    }

    handleSportTypeChange(sportType) {
        this.updateField("sportType", sportType, null, (s) => s);
    }

    handleDateChange(date) {
        if (!date) {
            this.updateField("date", new Date(), this.validateDate, (d) => d);
        } else {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            this.updateField("date", d, this.validateDate, (d) => d);
        }
    }

    handleTimeChange(time) {
        this.updateField("time", time, this.validateTime, (t) => parseInt(t, 10));
    }

    handleDistanceChange(distance) {
        this.updateField("distance", distance, this.validateDistance, (d) => parseFloat(d));
    }

    handleCancel(event) {
        if (this.state.id > 0) {
            this.props.history.push(`/activities`);
        } else {
            this.setState({...this.state, data: this.createDefaultActivity(-1)});
        }
    }

    validateFieldsImpl(errors) {
        errors["date"] = this.validateDate(this.state.data.date);
        errors["time"] = this.validateTime(this.state.data.time, true);
        errors["distance"] = this.validateDistance(this.state.data.distance, true);
    }

    playSuccessSound() {
        new Audio(successSound).play();
    }

    handleSaveImpl(errors) {
        // update the state
        this.setState({...this.state, errors: errors, saving: true});
        if (this.state.id > 0) {
            // id exists, just update
            SportsTrackerAPI.updateActivity(this.state.data).then(res => {
                this.playSuccessSound();
                this.props.history.push(`/activities`);
            });
        } else {
            // id does not exist, create a new activity
            SportsTrackerAPI.addActivity(this.state.data).then(res => {
                this.playSuccessSound();
                this.props.history.push(`/activities`);
            });
        }
    }

    validateDate(date) {
        let today = new Date();
        if (date > today) {
            return "You cannot set a date in the future";
        }
        return null;
    }

    validateTime(time) {
        const timeString = time.toString();
        const reg = /^[0-9]+$/
        if (timeString === "" || !timeString.match(reg)) {
            return "Wrong time format";
        } else if (time <= 0) {
            return "Time must be more than 0";
        } else if (time > 604800) {
            return "Time must be less than 604800";
        }
        return null;
    }

    validateDistance(distance) {
        if (distance.toString() === "") {
            return "Wrong distance format";
        } else if (distance <= 0) {
            return "Distance must be more than 0 km";
        } else if (distance > 99999) {
            return "Distance must be less than 100 000 km";
        }
        return null;
    }

    renderHeader() {
        const isEdit = this.state.id > 0;
        return (
            <div className="form-header">
                {isEdit ? "Edit activity" : "Create activity" }
            </div>
        );
    }

    renderActivity() {
        const dropdownSportTypes = this.state.dropdownSportTypes;

        const sportType = this.state.data.sportType;
        const date = this.state.data.date;
        const time = this.state.data.time;
        const distance = this.state.data.distance;

        const d = new Date();
        d.setHours(0, 0, 0, 0);
        const todayString = Helper.getStringDate(d);
        const dateString = Helper.getStringDate(date);

        const errors = this.state.errors;

        return (
            <div className="form-wrapper">
                <ul className="form">
                    <LabeledDropdown
                        name="sport"
                        val={sportType}
                        dropdownItems={dropdownSportTypes}
                        onValueChange={this.handleSportTypeChange.bind(this)}
                        label="Sport:" />
                    <LabeledDateInput
                        name="date"
                        max={todayString}
                        val={dateString}
                        onValueChange={this.handleDateChange.bind(this)}
                        error={errors["date"]}
                        label="Date:" />
                    <LabeledField
                        name="time"
                        type="number"
                        val={time}
                        onValueChange={this.handleTimeChange.bind(this)}
                        error={errors["time"]}
                        label="Time (s):" />
                    <LabeledField
                        name="distance"
                        type="number"
                        val={distance}
                        onValueChange={this.handleDistanceChange.bind(this)}
                        error={errors["distance"]}
                        label="Distance (km):" />
                    <li className="form-group-bottom">
                        <button onClick={this.handleCancel.bind(this)} className="btn">Cancel</button>
                        <button onClick={this.handleSave.bind(this)} className="btn">Save</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        let contents;
        if (this.state.loading) {
            contents = Messages.MessageLoading;
        } else if (!this.state.data) {
            contents = Messages.MessageActivityNotFound;
        } else if (this.state.saving) {
            contents = Messages.MessageSaving;
        } else {
            contents = this.renderActivity();
        }

        return (
            <div className="add-edit-activity-wrapper">
                {header}
                {contents}
            </div>
        );
    }
}

export default withRouter(AddEditActivity);
