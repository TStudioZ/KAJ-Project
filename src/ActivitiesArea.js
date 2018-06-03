import React, { Component } from 'react';
import ActivityList from './ActivityList';

class ActivitiesArea extends Component {
    render() {
        return (
            <div className="activities-area">
                This is the Activities Area.
                <ActivityList />
            </div>
        );
    }
}

export default ActivitiesArea;
