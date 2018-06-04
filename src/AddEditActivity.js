import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import LabeledField from './components/LabeledField';
import LabeledDropdown from './components/LabeledDropdown';
import SportsTrackerAPI, { SportActivity } from './SportsTrackerAPI';
import { MessageLoading, MessageSaving, MessageActivityNotFound } from './Messages';
import LabeledDateInput from './components/LabeledDateInput';
import Helper from './Helper';

class AddEditActivity extends Component {

    constructor(props) {
        super(props);

        this.createDefaultActivity = this.createDefaultActivity.bind(this);
        this.handleSportTypeChange = this.handleSportTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.validateDistance = this.validateDistance.bind(this);

        const id = this.props.match.params.id;
        const dropdownSportTypes = SportsTrackerAPI.getSportTypes();
        
        const activity = this.createDefaultActivity(id);
        if (id > 0) {
            this.state = { loading: true, saving: false, saveRequested: false, 
                id: id, dropdownSportTypes: dropdownSportTypes, activity: activity };
            SportsTrackerAPI.getActivity(id).then(a => {
                this.setState({...this.state, loading: false, activity: a});
            });
        } else {
            this.state = { loading: false, saving: false, saveRequested: false, 
                id: -1, dropdownSportTypes: dropdownSportTypes, activity: activity };
        }
    }

    createDefaultActivity(id) {
        return new SportActivity(id, "Running", new Date(), 0, 0);
    }

    handleSportTypeChange(sportType) {
        let activity = this.state.activity;
        activity.sportType = sportType;
        this.setState({...this.state, activity: activity});
    }

    handleDateChange(date) {
        let activity = this.state.activity;
        if (!date) {
            
        } else {
            activity.date = new Date(date);
        }
        this.setState({...this.state, activity: activity});
    }

    handleTimeChange(time) {
        let activity = this.state.activity;
        activity.time = time;
        this.setState({...this.state, activity: activity});
    }

    handleDistanceChange(distance) {
        let activity = this.state.activity;
        activity.distance = distance;
        this.setState({...this.state, activity: activity});
    }

    handleCancel(event) {
        if (this.state.id > 0) {
            this.props.history.push(`/activities`);
        } else {
            this.setState({...this.state, activity: this.createDefaultActivity(-1)});
        }
    }

    handleSave(event) {
        event.preventDefault();

        this.setState({...this.state, saveRequested: true}, () => {
            if (this.validateDate(this.state.activity.date) != null 
                || this.validateTime(this.state.activity.time, true) != null 
                || this.validateDistance(this.state.activity.distance, true) != null) {
                return false;
            }
            this.setState({...this.state, saving: true});

            if (this.state.id > 0) {
                SportsTrackerAPI.updateActivity(this.state.activity).then(res => {
                    //this.setState({...this.state, saving: false});
                    this.props.history.push(`/activities`);
                });
            } else {
                SportsTrackerAPI.addActivity(this.state.activity).then(res => {
                    //this.setState({...this.state, saving: false});
                    this.props.history.push(`/activities`);
                });
            }
        });
    }

    validateDate(date) {
        if (!date) {
            return "Choose date";
        }
        return null;
    }

    validateTime(time) {
        const timeString = time.toString();
        const reg = /^\d+$/;
        if (!timeString.match(reg)) {
            return "Wrong format";
        }
        const timeInt = parseInt(timeString, 10);
        if (this.state.saveRequested && timeInt <= 0) {
            return "Time must be >= 0";
        } else if (timeInt > 604800) {
            return "Time must be less than 604800";
        }
        return null;
    }

    validateDistance(distance) {
        const distanceString = distance.toString();
        const reg = /^\d*\.{0,1}\d*$/;
        if (!distanceString.match(reg)) {
            return "Wrong format";
        }
        const distanceFloat = parseFloat(distanceString);
        if (this.state.saveRequested && distanceFloat <= 0) {
            return "Distance must be >= 0";
        } else if (distanceFloat > 99999) {
            return "Distance must be less than 100 000 km";
        }
        return null;
    }

    renderHeader() {
        const isEdit = this.state.id > 0;
        return (
            <div className="form-header">
                {isEdit ? "Edit activity" : "Add activity" }
            </div>
        );
    }

    renderActivity() {
        const dropdownSportTypes = this.state.dropdownSportTypes;

        const sportType = this.state.activity.sportType;
        const date = this.state.activity.date;
        const time = this.state.activity.time;
        const distance = this.state.activity.distance;

        const todayString = Helper.getStringDate(new Date());
        const dateString = Helper.getStringDate(date);

        return (
            <div className="form-wrapper">
                <ul className="form">
                    <LabeledDropdown
                        name="sport"
                        val={sportType}
                        dropdownItems={dropdownSportTypes}
                        onValueChange={this.handleSportTypeChange}
                        label="Sport:" />
                    <LabeledDateInput
                        name="date"
                        max={todayString}
                        val={dateString}
                        onValueChange={this.handleDateChange}
                        validate={this.validateDate}
                        label="Date:" />
                    <LabeledField
                        name="time"
                        type="text"
                        val={time}
                        onValueChange={this.handleTimeChange}
                        validate={this.validateTime}
                        label="Time:" />
                    <LabeledField
                        name="distance"
                        type="text"
                        val={distance}
                        onValueChange={this.handleDistanceChange}
                        validate={this.validateDistance}
                        label="Distance (km):" />
                    <li className="form-group-bottom">
                        <button onClick={this.handleCancel} className="btn">Cancel</button>
                        <button onClick={this.handleSave} className="btn">Save</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        let contents;
        if (this.state.loading) {
            contents = MessageLoading;
        } else if (!this.state.activity) {
            contents = MessageActivityNotFound;
        } else if (this.state.saving) {
            contents = MessageSaving;
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
