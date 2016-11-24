import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Root from './Root';
import store from './store/store';


const app = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Root />
        </Provider>
    </AppContainer>,
    app
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
          <Provider store={store}>
              <NextApp />
          </Provider>
      </AppContainer>,
      app
    );
  });
}
