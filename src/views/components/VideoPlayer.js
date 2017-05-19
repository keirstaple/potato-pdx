import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { WindowResizeListener } from 'react-window-resize-listener';
import FontAwesome from 'react-fontawesome';

import { VideoColumns } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor() {
    super()
    this.state = {
      windowSize: { },
    }
  }

  renderVideo() {
    const windowSize = this.state.windowSize
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height={`${windowSize.windowWidth * (3/8)}`} width={`${windowSize.windowWidth * 0.75}px`} style={{position: 'absolute', margin: 'auto', top: '0', right: '0', bottom: '0', left: '0', maxHeight: `${windowSize.winowHeight * 0.95}` }} />
    )
  }

  handleClick() {
    return this.context.router.push('/');
  }

  windowResize(windowSize) {
    this.setState({ windowSize })
  }

  render() {
    return(
      <div>
        <VideoColumns />
        <div onClick={this.handleClick.bind(this)} style={{position: 'relative', height: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '4'}}>
          <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
          { this.renderVideo() }
        </div>

      </div>
    )
  }
};

export default connect(
  (state) => ({
    videoId: videoId(state)
  })
)(VideoPlayer);

// <FontAwesome
//   className="times-icon"
//   name="window-close-o"
//   size="2x"
//   style={{color: 'white', position: 'absolute', left: '50%', top: '50%', marginLeft: '40vw', marginTop: '-40vh', zIndex: '2', cursor: 'pointer'}}
//   onClick={this.handleClick.bind(this)}
// />
