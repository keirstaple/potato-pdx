import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import { WindowResizeListener } from 'react-window-resize-listener';
import throttle from 'lodash.throttle';
import logo from '../../../public/images/logo_wordmark.png';
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
    }
    this.handleScroll = throttle(this.handleScroll.bind(this), 5);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.initializeApp();
  }

  componentWillMount() {
    const ua = window.navigator.userAgent;
    console.log('uaaaaa', ua);
    if(ua.indexOf('iPhone') !== -1 && ua.indexOf('Safari') !== -1 && ua.indexOf('Chrome') !== 1) {
      const clientHeight = document.documentElement.clientHeight;
      const offSet = clientHeight * (this.props.top/100);
      const top = `${offSet + 44}px`;
      console.log('hiiiiiiiiiiiiiiiiiiiii', document.documentElement.clientHeight);
      this.setState({ top });
    };
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
    //multiply by .65 to convert pixels to vh
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

    if(pageTop >= 130) {
      this.setState({ display: 'block' })
    } else if(pageTop < 130 ) {
      this.setState({ display: 'none' })
    }

    if(newTop < -2.5) {
      aboutSectionPolyStyle.top = `${newTop}vh`;
      aboutSectionStyle.top = `${newTop - 15}vh`;
      iconStyle.top = `${newTop + 47.5}vh`;
    }

    if (newTop <= -43.75 && this.state.windowSize.windowWidth > 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*0.5} 0 ${windowHeight*0.5} 0 0` });
    }

    if (newTop > -43.75 && newAngle <= 0.90 && this.state.windowSize.windowWidth > 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*newAngle} 0 ${windowHeight*0.5} 0 0`, polyHeight: `${windowHeight*newAngle}px` });
    }
    if (newTop > -43.75 && newAngle <= 0.90 && this.state.windowSize.windowWidth < 414) {
      this.setState({ polygon: `${windowWidth} 0 ${windowWidth} ${windowHeight*newAngle} 0 ${windowHeight*newAngle} 0 0`, polyHeight: `${windowHeight*newAngle}px` });
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 2.15;
    const fromTop = this.state.top || `${this.props.top}vh`;
    return (
      <div className="App" style={{ height: `${scrollHeight}px`, position: 'relative'}}>
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        <img src={logo} alt="logo" style={{ position: 'fixed', height: '3.5vh', top: '1.5vh', left: '1vw', bottom: '1.5vh', right: '1vw', width: 'auto', zIndex: '5' }} />

        <svg stroke="none" ref="aboutSectionPoly" fill="none" style={{ height: `${this.state.polyHeight}`, top: `${fromTop}`, width: '100vw', position: 'fixed', zIndex: '3', backgroundColor: 'transparent' }}>
          <polygon ref="polygon" fill="white" points={this.state.polygon} />
        </svg>

        <div ref="aboutSection" style={{ position: 'fixed', zIndex: '4', left: '50%', marginRight: '-50%', transform: 'translate(-50%, -50%)'  }}>
          <About display={this.state.display} />
        </div>

        <div ref="arrowIcon" style={{ position: 'fixed', left: '50%', top: '3.5vh', zIndex: '6', margin: '0', padding: '0' }}>
          <FontAwesome name="play" size={this.state.arrowSize} style={{ WebkitTransform: 'rotate(90deg)', MsTransform: 'rotate(90deg)', transform: 'rotate(90deg)', color: 'white' }} />
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
