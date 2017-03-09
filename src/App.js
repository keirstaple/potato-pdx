import React, { Component } from 'react';
import NavBar from './NavBar';

require('dotenv').config()
require('es6-promise').polyfill();
require('isomorphic-fetch');

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
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
      .then(data => this.setState({ data: data.data, loading: false }));
  }

  render() {
    return (
      <div className="App">
        <NavBar data={this.state.data} loading={this.state.loading} />
      </div>
    );
  }
}

export default App;
