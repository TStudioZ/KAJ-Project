import React, { Component } from 'react';

class ActivityListItem extends Component {

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
                </ul>
            </li>
        );
    }
}

export default ActivityListItem;
