// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router';
//
// require('dotenv').config()
// require('es6-promise').polyfill();
// require('isomorphic-fetch');
//
// import App from './App';
// import VideoPlayer from './VideoPlayer';
//
// import './App.scss';
//
// class Root extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       loading: true
//     }
//   }
//
//   componentDidMount() {
//     let token = process.env.REACT_APP_ACCESS_TOKEN;
//     let init = {
//       method: 'GET',
//       headers: {
//         "Authorization": `Bearer ${token}`
//       }
//     };
//     fetch('https://api.vimeo.com/users/user58377879/videos', init)
//       .then(response => response.json())
//       .then(data => this.setState({ data: data.data, loading: false }));
//   }
//
//   render() {
//     console.log(this.state);
//     return(
//       <Router history={browserHistory} >
//         <Route path="/" component={App} data={this.state.data} loading={this.state.loading} >
//           <Route path="/:video" component={VideoPlayer} />
//         </Route>
//       </Router>
//     )
//   }
// }
//
// ReactDOM.render(
//   <Root />,
//   document.getElementById('root')
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reducers from './reducers';
// import routes from './routes';
// import promise from 'redux-promise';
// // import thunk from 'redux-thunk';
//
// const createStoreWithMiddleware = applyMiddleware(
//   promise
// )(createStore);
//
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//   </Provider>,
//   document.getElementById('root')
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import { Root } from './views';
import getRoutes from './routes.js';
import './index.css';

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = getRoutes(history);

ReactDOM.render(
  <Root store={store} history={history} routes={routes} />,
  document.getElementById('root')
);
