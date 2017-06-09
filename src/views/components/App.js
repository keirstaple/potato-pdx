import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';
import { WindowResizeListener } from 'react-window-resize-listener';
import throttle from 'lodash.throttle';
import logo from '../../../public/images/logo_wordmark.svg';
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
      windowSize: { },
      arrowSize: '2x',
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

  windowResize(windowSize) {
    this.setState({ windowSize });

    if(windowSize.windowWidth < 1440) {
      this.setState({ arrowSize: '2x' });
    } else if (windowSize.windowWidth >= 1440 ) {
      this.setState({ arrowSize: '3x' });
    }
  }

  handleScroll(event) {
    const { speed, top } = this.props;

    // Top positons
    //multiply by .65 to convert pixels to vh
    const pageTop = window.pageYOffset * 0.65;
    const newTop = (top - (pageTop * speed));
    const newAngle = 100 + (newTop - 4.5);
    const aboutSectionStyle = this.refs.aboutSection.style;
    const iconStyle = this.refs.arrowIcon.style;

    if(pageTop > 40.5) {
      iconStyle.display = 'none';
    } else if(pageTop <= 40.5) {
      iconStyle.display = 'block';
    }

    if(pageTop >= 130) {
      this.setState({ display: 'block' })
    } else if(pageTop < 130 ) {
      this.setState({ display: 'none' })
    }

    if(newTop < -2.5) {
      aboutSectionStyle.top = `${newTop}vh`;
      iconStyle.top = `${newTop + 49}vh`;
    }

    if(newTop < -45.3 && this.state.windowSize.windowWidth > 414) {
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% 50%, 0 50%)`;
      aboutSectionStyle.WebkitClipPath = `polygon(0 0, 100% 0, 100% 50%, 0 50%)`;
    }

    if(newTop > -45.3 && newAngle <= 90 && this.state.windowSize.windowWidth > 414) {
      aboutSectionStyle.clipPath = `polygon(0 0, 100% 0, 100% ${newAngle}%, 0 50%)`;
      aboutSectionStyle.WebkitClipPath = `polygon(0 0, 100% 0, 100% ${newAngle}%, 0 50%)`;
    }
  }

  render() {
    let scrollHeight = window.innerHeight * 2.15;
    return (
      <div className="App" style={{ height: `${scrollHeight}px`, position: 'relative'}}>
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        <object data={logo} style={{ position: 'fixed', height: '3.5vh', top: '1.5vh', left: '1vw', bottom: '1.5vh', right: '1vw', width: 'auto', zIndex: '5' }} />

        <div ref="aboutSection" style={{ height: '103.5vh', top: '-45.5vh', width: '100vw', position: 'fixed', zIndex: '3', backgroundColor: 'white', WebkitClipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'}}>
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
