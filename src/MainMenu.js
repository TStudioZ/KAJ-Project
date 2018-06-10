import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Represents the main menu of the application.
 */
class MainMenu extends Component {
    render() {
        return (
            <nav>
                <div className="navigation">
                    <NavLink className="link" activeClassName="link-active" to="/" exact>Home</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/user" exact>My profile</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/activities" exact>Activities</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/activities/create" exact>Create activity</NavLink>
                    <NavLink className="link" activeClassName="link-active" to="/stats" exact>Stats</NavLink>
                </div>
            </nav>
        );
    }
}

export default MainMenu;
