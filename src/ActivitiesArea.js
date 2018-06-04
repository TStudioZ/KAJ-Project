import React, { Component } from 'react';
import ActivityList from './ActivityList';

class ActivitiesArea extends Component {
    render() {
        return (
            <div className="activities-area">
                <ActivityList />
            </div>
        );
    }
}

export default ActivitiesArea;
