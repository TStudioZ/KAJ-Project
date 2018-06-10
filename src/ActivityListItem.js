import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

/**
 * Represents one row in the list of activities.
 */
class ActivityListItem extends Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    /**
     * Navigates to an activity's detail. 
     */
    handleEdit(event) {
        const a = this.props.activity;
        this.props.history.push(`/activities/${a.id}`);
    }

    render() {
        const a = this.props.activity;

        return (
            <li className="activity-list-item">
                <ul className="activity-list-item-cols">            
                    <li>{a.sportType}</li>
                    <li>{a.date.toLocaleDateString("en-US")}</li>
                    <li>
                        <div className="activity-list-item-col-right">   
                            {a.getTimeString()}
                        </div>
                    </li>
                    <li>
                        <div className="activity-list-item-col-right">
                            {a.distance} km
                        </div>
                    </li>
                    <li>
                        <button onClick={this.handleEdit} className="btn-small-list">Edit</button>
                    </li>
                </ul>
            </li>
        );
    }
}

export default withRouter(ActivityListItem);
