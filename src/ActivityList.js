import React, { Component } from 'react';
import SportsTrackerAPI from './SportsTrackerAPI';
import { MessageLoading } from './Messages';
import ActivityListHeader from './ActivityListHeader';
import ActivityListItem from './ActivityListItem';

class ActivityList extends Component {

    constructor(props) {
        super(props);

        this.state = { loading: true, activities: [] };
        SportsTrackerAPI.getActivites().then(a => {
            console.log(a);
            this.setState({loading: false, activities: a});
        })
    }

    renderActivityList() {
        const activities = this.state.activities;

        return (
            <div className="activity-list">
                <ActivityListHeader />
                {activities.map(a =>
                    <ActivityListItem 
                        key={a.id} 
                        activity={a} />
                )}
            </div>
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
