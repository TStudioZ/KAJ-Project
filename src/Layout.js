import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import MainContent from './MainContent';
import UserArea from './UserArea';

class Layout extends Component {
    render() {
        return (
            <div className="page">
                <Header />
                <section>
                    <Switch>
                        <Route exact path='/' component={MainContent} />
                        <Route exact path='/user' component={UserArea} />
                        <Route component={NoMatch} />
                    </Switch>
                </section>
                <Footer />
            </div>
        );
    }
}

const NoMatch = ({ location }) => (
    <main>
        No match for <code>{location.pathname}</code>
    </main>
  );

export default Layout;
