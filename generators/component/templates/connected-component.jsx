import React, { Component } from 'react';
import { connect } from 'react-redux';

import './<%= componentName %>.css';

export class <%= componentName %> extends Component {
    render() {
        return (
			
		);
    }
}

function mapStateToProps(state) {

}
const <%= containerName %> = connect(mapStateToProps)(<%= componentName %>);

export default <%= containerName %>;
