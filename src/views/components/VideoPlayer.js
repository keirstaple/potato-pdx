import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import { VideoColumns } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  renderVideo() {
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height='500px' width='800px' />
    )
  }

  render() {
    return(
      <div>
        <VideoColumns />
        <div style={{position: 'absolute', top: '50%', left: '50%', marginTop: '-250px', marginLeft: '-350px'}}>
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
