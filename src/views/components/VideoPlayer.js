import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { WindowResizeListener } from 'react-window-resize-listener';

import { VideoColumns } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      windowSize: { },
    };
  }

  renderVideo() {
    const windowSize = this.state.windowSize;
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height={`${windowSize.windowWidth * (3/8)}`} width={`${windowSize.windowWidth * 0.75}px`} style={{position: 'absolute', margin: 'auto', top: '0', right: '0', bottom: '0', left: '0', maxHeight: `${windowSize.winowHeight * 0.95}` }} />
    );
  }

  handleClick() {
    return this.context.router.push('/');
  }

  windowResize(windowSize) {
    this.setState({ windowSize });
  }

  render() {
    return(
      <div>
        <VideoColumns />
        <div onClick={this.handleClick.bind(this)} style={{position: 'relative', height: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '7'}}>
          <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
          { this.renderVideo() }
        </div>

      </div>
    );
  }
};

export default connect(
  (state) => ({
    videoId: videoId(state)
  })
)(VideoPlayer);
