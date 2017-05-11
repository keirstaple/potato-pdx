import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import throttle from 'lodash.throttle';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.object,
    speed: React.PropTypes.number,

    // Style
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    top: React.PropTypes.number,
    left: React.PropTypes.string,
    right: React.PropTypes.string,
  }

  static defaultProps = {
    width: 'auto',
    height: 'auto',
    top: -80,
    left: 'inherit',
    right: 'inherit',
    speed: -0.03,
  }

  constructor() {
    super();
    this.handleScroll = throttle(this.handleScroll.bind(this), 5);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { speed } = this.props;
    const top = this.props.top;
    // Top positons

    //multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));

    console.log('newTop' , newTop)

    if(newTop < -0.15) {
      this.refs.aboutSection.style.top = `${newTop}vh`;
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 6.75;
    return (
      <div className="App" style={{ height: `${scrollHeight}`, position: 'relative'}}>
        <div ref="aboutSection" style={{ height: '90vh', top: '-80vh', width: '100vw', position: 'fixed', zIndex: '4', backgroundColor: 'white'}}>
          <About />
        </div>
        <div ref="videoColumns" style={{ margin: 0, padding: 0 }}>
          <VideoColumns />
        </div>
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
