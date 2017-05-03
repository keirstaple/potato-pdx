import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transform: -85,
    }
  }

  componentDidMount() {
    console.log('app mounted');
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    // event.srcElement.body.scrollTop = event.srcElement.body.scrollTop - this.state.transform;
    let scrollTop = event.srcElement.body.scrollTop;
    let itemTranslate = () => {
      let transform = this.state.transform;
      if(transform < 0) {
        transform++;
        this.setState({ transform })
      }
      return transform;
    };

    itemTranslate()
    console.log('scroll', scrollTop);
    console.log('translate', itemTranslate);
    console.log('state', this.state.transform);
    // this.setState({
    //   transform: itemTranslate
    // });
  }

  render() {
    return (
      <div className="App" style={{ position: 'relative' }}>
        <About position={this.state.transform} />
        <VideoColumns />
        { this.props.children }
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
