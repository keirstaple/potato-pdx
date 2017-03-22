import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import NavBar from './NavBar';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  renderVideo() {
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} />
    )
  }

  render() {
    return(
      <div>
        <NavBar />
        { this.renderVideo() }
      </div>
    )
  }
};

export default connect(
  (state) => ({
    videoId: videoId(state)
  })
)(VideoPlayer);
