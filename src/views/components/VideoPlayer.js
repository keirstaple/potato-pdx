import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

import { NavBar, NextButton } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  renderVideo() {
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height='500' width='800' />
    )
  }

  render() {
    return(
      <div style={{display: 'flex'}}>
        <NavBar />
        <div style={{marginLeft: '25px', marginTop: '80px'}}>
          { this.renderVideo() }
        </div>
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
