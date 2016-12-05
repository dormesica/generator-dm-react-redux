// -----------------------------------------------------------------
// This file contains the "Root" component of the react application.
// The render function of the component returns what one would
// normally write in the reactDOM.render() function.
// -----------------------------------------------------------------

import React, { Component } from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import Layout from './components/Layout/Layout';


class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    { /** add more routes or delete if not needed */ }
                </Route>
            </Router>
        );
    }
}

export default Root;
