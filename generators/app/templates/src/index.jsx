import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import store from './store/store';


const app = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    app
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp />
      </AppContainer>,
      app
    );
  });
}
