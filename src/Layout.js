import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import UserArea from './UserArea';
import ActivitiesArea from './ActivitiesArea';
import AddEditActivity from './AddEditActivity';

class Layout extends Component {
    render() {
        return (
            <div className="page">
                <Header />
                <main>
                    <div className="main">
                        <Switch>
                            <Route exact path='/' component={MainContent} />
                            <Route exact path='/user' component={UserArea} />
                            <Route exact path='/activities' component={ActivitiesArea} />
                            <Route exact path='/activities/add' component={AddEditActivity} />
                            <Route path='/activities/:id' component={AddEditActivity} />
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }
}

const NoMatch = ({ location }) => (
    <div>
        No match for <code>{location.pathname}</code>
    </div>
  );

export default Layout;
