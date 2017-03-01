import React, { Component } from 'react';
require('dotenv').config()
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let token = process.env.REACT_APP_ACCESS_TOKEN;
    let init = {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
    fetch('https://api.vimeo.com/users/user58377879/videos', init)
      .then(response => response.json())
      .then(data => this.setState({ data: data.data }))
  }

  render() {
    let videoNames = this.state.data.map(item => item.name);
    console.log(videoNames);
    return (
      <div className="App">
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default App;
