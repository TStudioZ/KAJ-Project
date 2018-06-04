import React, { Component } from 'react';
import UserProfile from './UserProfile';

class UserArea extends Component {
    render() {
        return (
            <div className="user-area">
                <UserProfile />
            </div>
        );
    }
}

export default UserArea;
