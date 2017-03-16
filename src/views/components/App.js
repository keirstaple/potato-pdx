import React, { Component } from 'react';
import NavBar from './NavBar';
// import VideoPlayer from './VideoPlayer';

class App extends Component {


  render() {
    return (
      <div className="App">
        <NavBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
