import React, { Component } from 'react';
import { connect } from 'react-redux';

import './<%= componentName %>.css';

export class <%= componentName %> extends Component {
    render() {
        
    }
}

function mapStateToProps(state) {

}
const <%= containerName %> = connect(mapStateToProps)(<%= className %>);

export default <%= containerName %>;
