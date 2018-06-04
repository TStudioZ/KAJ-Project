import React, { Component } from 'react';
import LabeledField from './components/LabeledField';
import SportsTrackerAPI, { SportActivity } from './SportsTrackerAPI';
import { MessageLoading } from './Messages';

class AddEditActivity extends Component {

    constructor(props) {
        super(props);

        const id = this.props.match.params.id;
        const activity = new SportActivity(id, "", "", 0, 0);
        if (id > 0) {
            this.state = { loading: true, id: id, activity: activity };
            SportsTrackerAPI.getActivity(id).then(a => {
                this.setState({...this.state, loading: false, activity: a});
            })
        } else {
            this.state = { loading: false, id: -1, activity: activity };
        }

        this.handleSportTypeChange = this.handleSportTypeChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleDistanceChange = this.handleDistanceChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave(this);
    }

    handleSportTypeChange(sportType) {

    }

    handleDateChange(date) {

    }

    handleTimeChange(time) {

    }

    handleDistanceChange(distance) {

    }

    handleCancel(event) {

    }

    handleSave(event) {

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
        const sportType = this.state.activity.sportType;
        const date = this.state.activity.date;
        const time = this.state.activity.time;
        const distance = this.state.activity.distance;

        return (
            <div className="form-wrapper">
                <ul className="form">
                    <LabeledField
                        name="sport"
                        type="text"
                        val={sportType}
                        onValueChange={this.handleSportTypeChange}
                        label="Sport:" />
                    <LabeledField
                        name="date"
                        type="text"
                        val={date}
                        onValueChange={this.handleDateChange}
                        label="Date:" />
                    <LabeledField
                        name="time"
                        type="text"
                        val={time}
                        onValueChange={this.handleTimeChange}
                        label="Time:" />
                    <LabeledField
                        name="distance"
                        type="text"
                        val={distance}
                        onValueChange={this.handleDistanceChange}
                        label="Distance:" />
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
        const contents = this.state.loading ? MessageLoading : this.renderActivity();

        return (
            <div className="add-edit-activity-wrapper">
                {header}
                {contents}
            </div>
        );
    }
}

export default AddEditActivity;
