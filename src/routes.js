import React from 'react';
import { Route, Router } from 'react-router';

import { App, VideoPlayer } from './views';

const routes = (history) => (
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/videos/:id" component={VideoPlayer} />
  </Router>
);

export default routes;
