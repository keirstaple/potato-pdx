import React from 'react';
import { Route, Router } from 'react-router';
import { App, VideoPlayer } from './views';
import ReactGA from 'react-ga';

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
ReactGA.initialize(`${trackingId}`);

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const routes = (history) => (
  <Router history={history}>
    <Route onEnter={logPageView} path="/" component={App} />
    <Route onEnter={logPageView} path="/videos/:id" component={VideoPlayer} />
  </Router>
);

export default routes;
