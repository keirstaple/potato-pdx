import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import throttle from 'lodash.throttle';
import logo from '../logo_wordmark.svg';
import FontAwesome from 'react-fontawesome';

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
    top: -45.5,
    left: 'inherit',
    right: 'inherit',
    speed: -0.08,
  }

  constructor() {
    super();
    this.state = {
      display: 'none',
    }
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
    const { speed, top } = this.props;

    // Top positons
    //multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));
    const newAngle = 100 / (pageTop * 0.05) * 50;
    const inverseAngle = 45 + (200 - newAngle);
    const aboutSectionStyle = this.refs.aboutSection.style;
    const iconStyle = this.refs.arrowIcon.style;

    if(pageTop >= 130) {
      this.setState({ display: 'block' })
    } else if(pageTop < 130 ) {
      this.setState({ display: 'none' })
    }

    if(newTop < -2.5) {
      aboutSectionStyle.top = `${newTop}vh`;
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% 50%, 0 50%)`;
      aboutSectionStyle.WebkitClipPath = `polygon(0 0, 100% 0, 100% 50%, 0 50%)`;
      iconStyle.top = `${newTop+49}vh`;
    }

    if(newTop > -2.50) {
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% ${inverseAngle}%, 0 50%)`;
      aboutSectionStyle.WebkitClipPath = `polygon(0 0, 100% 0, 100% ${inverseAngle}%, 0 50%)`;
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 2.53;
    return (
      <div className="App" style={{ height: `${scrollHeight}px`, position: 'relative'}}>
        <img src={logo} alt="logo" style={{ position: 'fixed', height: '25px', top: '10px', left: '10px', width: 'auto', zIndex: '5' }} />

        <div ref="aboutSection" style={{ height: '103.5vh', top: '-45.5vh', width: '100vw', position: 'fixed', zIndex: '3', backgroundColor: 'white', WebkitClipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'}}>
          <About display={this.state.display} />
        </div>

        <div ref="arrowIcon" style={{ position: 'fixed', left: '50%', top: '3.5vh', zIndex: '6', margin: '0', padding: '0' }}>
          <FontAwesome name="play" size="2x" style={{ WebkitTransform: 'rotate(90deg)', MsTransform: 'rotate(90deg)', transform: 'rotate(90deg)', color: 'white' }} />
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
