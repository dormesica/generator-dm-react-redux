import React, { Component } from 'react';

//----------------------------------------------------------------
// Renders a layout for the react-router.
// The lower div contains the components that are injected to the 
// component when the path is changes by the react-router.
// Above that div add any other components needed such as headers.
//----------------------------------------------------------------

class Layout extends Component {
    render() {
        return (
            <div>
                {/* add additional components here */}
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Layout;
