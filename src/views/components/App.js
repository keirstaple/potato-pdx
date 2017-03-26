import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Logo } from './../index';
import { initializeApp } from './../../state';

class App extends Component {
  componentWillMount() {
    console.log('hello?')
  }
  componentDidMount() {
    console.log('app mounted');
    this.props.initializeApp();
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        { this.props.children }
        <Logo />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    appInitialized: state.app.appInitialized
  }),
  dispatch => ({
    initializeApp: () => dispatch(initializeApp())
  })
)(App);
