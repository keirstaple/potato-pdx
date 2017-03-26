import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import { NavBar, NextButton } from '../index';

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
        <NextButton />
      </div>
    )
  }
};

export default connect(
  (state) => ({
    videoId: videoId(state)
  })
)(VideoPlayer);
