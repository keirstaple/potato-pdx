import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import throttle from 'lodash.throttle';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.object,
    speed: React.PropTypes.number,
    angle: React.PropTypes.number,

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
    top: -95,
    left: 'inherit',
    right: 'inherit',
    speed: -0.03,
    angle: 100,
  }

  constructor() {
    super();
    this.handleScroll = throttle(this.handleScroll.bind(this), 5);
  }

  componentWillMount() {
    window.scrollTo(0,0);
    document.body.scrollTop = 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { speed, top, angle } = this.props;

    // Top positons
    //multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));

    const newAngle = (newTop / 0.053) * -1;

    console.log('newTop' , newTop, 'newangle', newAngle)

    if(newTop < -2.5) {
      this.refs.aboutSection.style.top = `${newTop}vh`;
    }

    if(angle >= 50) {
     this.refs.aboutSection.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0 ${newAngle}%)`
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 7.75;
    return (
      <div className="App" style={{ height: `${scrollHeight}`, position: 'relative'}}>
        <div ref="aboutSection" style={{ height: '101.5vh', top: '-95vh', width: '100vw', position: 'fixed', zIndex: '4', backgroundColor: 'white', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'}}>
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
