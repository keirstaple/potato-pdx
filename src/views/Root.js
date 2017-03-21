import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import DevTools from './DevTools';

import App from './';
import VideoPlayer from './';

const Root = ({ store, routes, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/videos/:id" component={VideoPlayer} />
        </Route>
      </Router>
      <h1>hello from root</h1>
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    }).isRequired,
  history: PropTypes.shape({}),
};

export default Root;
