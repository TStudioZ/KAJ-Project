import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class MainMenu extends Component {
    render() {
        return (
            <nav>
                <div className="navigation">
                    <NavLink className="link" activeClassName="link-active" to="/" exact>Home</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/user" exact>My profile</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/activities" exact>Activities</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/activities/create" exact>Create activity</NavLink>
                </div>
            </nav>
        );
    }
}

export default MainMenu;
