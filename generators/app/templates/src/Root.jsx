// -----------------------------------------------------------------
// This file contains the "Root" component of the react application.
// The render function of the component returns what one would
// normally write in the reactDOM.render() function.
// -----------------------------------------------------------------

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App/App';
import CounterContainer from './components/Counter/Counter'


class Root extends Component {
    render() {
    }
}

export default Root;
