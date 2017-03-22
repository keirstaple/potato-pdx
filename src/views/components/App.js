import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';
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
      </div>
    );
  }
}

export default connect(
  dispatch => ({
    initializeApp: () => dispatch(initializeApp())
  })
)(App);
