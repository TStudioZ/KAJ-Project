import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';
import ActivityListHeader from './ActivityListHeader';
import ActivityListItem from './ActivityListItem';

/**
 * Displays a list with all activities.
 */
class ActivityList extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: true, activities: [] };
        SportsTrackerAPI.getActivites().then(a => {
            this.setState({loading: false, activities: a});
        })
    }

    renderActivityList() {
        const activities = this.state.activities;

        return (
            <ul className="activity-list">
                <ActivityListHeader />
                {activities.map(a =>
                    <ActivityListItem 
                        key={a.id} 
                        activity={a} />
                )}
            </ul>
        );
    }

    render() {
        const contents = this.state.loading ? MessageLoading : this.renderActivityList();

        return (
            <div className="activity-list-wrapper">
                {contents}
            </div>
        );
    }
}

export default ActivityList;
