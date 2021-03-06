import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import { WindowResizeListener } from 'react-window-resize-listener';
import throttle from 'lodash.throttle';
import FontAwesome from 'react-fontawesome';

import { potatoLogo } from '../../consts/constants';

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
    top: -43.75,
    left: 'inherit',
    right: 'inherit',
    speed: -0.08,
  }

  constructor() {
    super();
    this.state = {
      display: 'none',
      windowSize: { },
      arrowSize: '2x',
      polygon: '',
      polyHeight: '',
      top: '',
      mobileSafari: false,
    }
    this.handleScroll = throttle(this.handleScroll.bind(this), 5);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const ua = window.navigator.userAgent;
    if(ua.indexOf('iPhone') !== -1 && ua.indexOf('Safari') !== -1 && ua.indexOf('CriOS') === -1) {
      this.setState({ mobileSafari: true });
    };
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  windowResize(windowSize) {
    const { windowHeight, windowWidth } = windowSize;
    this.setState({ windowSize, polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*0.5} 0 ${windowHeight*0.5} 0 0`, polyHeight: `${windowHeight*0.5}px` });

    if(windowSize.windowWidth < 1440) {
      this.setState({ arrowSize: '2x' });
    } else if (windowSize.windowWidth >= 1440 ) {
      this.setState({ arrowSize: '3x' });
    }
  }

  handleScroll(event) {
    const { speed, top } = this.props;
    const { windowWidth, windowHeight } = this.state.windowSize;
    // Top positons
    // multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));
    const newAngle = (100 + (newTop - 6.5))/100;
    let aboutSectionPolyStyle = this.refs.aboutSectionPoly.style;
    let aboutSectionStyle = this.refs.aboutSection.style;
    let iconStyle = this.refs.arrowIcon.style;

    if (pageTop > 40.5) {
      iconStyle.display = 'none';
    } else if (pageTop <= 40.5) {
      iconStyle.display = 'block';
    }

    if (pageTop >= 130) {
      this.setState({ display: 'block' });
    } else if(pageTop < 130 ) {
      this.setState({ display: 'none' });
    }

    if (newTop < -2.5) {
      aboutSectionPolyStyle.top = `${newTop}vh`;
      aboutSectionStyle.top = `${newTop - 15}vh`;
      iconStyle.top = `${newTop + 47.5}vh`;
    }

    if (newTop <= top && windowWidth > 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*0.5} 0 ${windowHeight*0.5} 0 0` });
    }

    if (newTop > top && newAngle <= 0.90 && windowWidth > 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*newAngle} 0 ${windowHeight*0.5} 0 0`, polyHeight: `${windowHeight*newAngle}px` });
    }
    if (newTop > top && newAngle <= 0.90 && windowWidth < 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*newAngle} 0 ${windowHeight*newAngle} 0 0`, polyHeight: `${windowHeight*newAngle}px` });
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 2.15;
    const fromTop = `${this.props.top}vh`;
    const logo = potatoLogo;

    return (
      <div
        className="App"
        style={{
          height: `${scrollHeight}px`,
          position: 'relative'
        }}
      >
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        <div
          alt="logo"
          style={{
            backgroundImage: `url(${logo})`,
            imageRendering: 'WebkitOptimizeContrast',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            backgroundPosition: 'left center',
            position: 'fixed',
            height: '3.5vh',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            width: '100vw',
            zIndex: '6',
            border: '10px solid white'
          }}
        />

        <svg
          stroke="none"
          ref="aboutSectionPoly"
          fill="none"
          style={{
            height: `${this.state.polyHeight}`,
            top: `${fromTop}`,
            width: '100vw',
            position: 'fixed',
            zIndex: '5',
            backgroundColor: 'transparent'
          }}
        >
          <polygon ref="polygon" fill="white" points={this.state.polygon} />
        </svg>

        <div
          ref="aboutSection"
          style={{
            position: 'fixed',
            zIndex: '6',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <About display={this.state.display} />
        </div>

        <div
          ref="arrowIcon"
          style={{
            position: 'fixed',
            width: '100%',
            textAlign: 'center',
            top: '4vh',
            zIndex: '4',
            padding: '0'
          }}
        >
          <FontAwesome
            name="play"
            size={this.state.arrowSize}
            style={{
              WebkitTransform: 'rotate(90deg)',
              MsTransform: 'rotate(90deg)',
              transform: 'rotate(90deg)',
              color: 'white',
              padding: '0px 0px 1.5px 0px',
            }}
          />
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
