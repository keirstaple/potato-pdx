import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import { VideoColumns } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  renderVideo() {
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height='500px' width='800px' style={{}} />
    )
  }

  render() {
    return(
      <div>
        <VideoColumns />
        <div style={{position: 'absolute', height: '100vh', width: '97.6vw', marginTop: '-100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '1'}}>
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
