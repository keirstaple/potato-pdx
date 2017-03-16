import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import { initializeApp } from './../../state';

class App extends Component {
  componentWillMount() {
    console.log('hello?')
  }
  componentDidMount() {
    this.props.initializeApp();
    console.log('app mounted');
  }

  render() {
    return (
      <div className="App">
        <h1>Hi from App</h1>
        <NavBar />
        { this.props.children }
      </div>
    );
  }
}

export default connect(
  dispatch => ({
    initializeApp: () => dispatch(initializeApp())
  })
)(App);
