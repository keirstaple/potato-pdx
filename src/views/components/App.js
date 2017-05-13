import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import throttle from 'lodash.throttle';
import logo from '../logo_wordmark.svg';

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
    top: -43.5,
    left: 'inherit',
    right: 'inherit',
    speed: -0.08,
  }

  constructor() {
    super();
    this.handleScroll = throttle(this.handleScroll.bind(this), 5);
  }

  // componentWillMount() {
  //   window.scrollTo(0,0);
  //   document.body.scrollTop = 0;
  // }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    const { speed, top } = this.props;

    // Top positons
    //multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));

    const newAngle = 100 / (pageTop * 0.05) * 50;

    const inverseAngle = 45 + (200 - newAngle);

    console.log('pageTop', pageTop)
    console.log('newTop', newTop)
    console.log('newAngle', newAngle)
    console.log('inverseAngle', inverseAngle)

    console.log('pageYOffset', pageTop)
    console.log('windowHeight', window.innerHeight)

    const aboutSectionStyle = this.refs.aboutSection.style
    if(newTop < -2.5) {
      aboutSectionStyle.top = `${newTop}vh`;
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% 50%, 0 50%)`;
    }

    // if(newAngle > 50) {
    // }

    if(newTop > -2.50) {
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% ${inverseAngle}%, 0 50%)`;
    }

  }

  render() {
    let scrollHeight = window.innerHeight * 2.51;
    return (
      <div className="App" style={{ height: `${scrollHeight}px`, position: 'relative'}}>
        <img src={logo} alt="logo" style={{ position: 'fixed', height: '35px', top: '10px', left: '10px', width: 'auto', zIndex: '5' }} />

        <div ref="aboutSection" style={{ height: '103.5vh', top: '-43.5vh', width: '100vw', position: 'fixed', zIndex: '3', backgroundColor: 'white', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'}}>
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
