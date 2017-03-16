import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/App';
import VideoPlayer from './components/VideoPlayer';

export default (
  <Router history={browserHistory} routes={routes} >
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      <Route path="videos/:id" component={VideoPlayer} />
    </Route>
  </Router>
);
