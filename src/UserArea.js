import React, { Component } from 'react';
import UserProfile from './UserProfile';

class UserArea extends Component {
    render() {
        return (
            <div className="user-area">
                This is the User Area.
                <UserProfile />
            </div>
        );
    }
}

export default UserArea;
