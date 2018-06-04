import React, { Component } from 'react';

class ActivityListHeader extends Component {

    render() {
        return (
            <li className="activity-list-header">
                <ul className="activity-list-header-cols">
                    <li>Sport</li>
                    <li>Date</li>
                    <li>Time</li>
                    <li>Distance</li>
                    <li></li>
                </ul>
            </li>
        );
    }
}

export default ActivityListHeader;
