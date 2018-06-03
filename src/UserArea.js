import React, { Component } from 'react';
import UserProfile from './UserProfile';

class UserArea extends Component {
    render() {
        return (
            <main>
                This is the User Area.
                <UserProfile />
            </main>
        );
    }
}

export default UserArea;
