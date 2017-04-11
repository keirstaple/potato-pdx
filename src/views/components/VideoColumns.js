import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getVideosThunk, videoData } from './../../state';

class VideoColumns extends Component {

  render() {
    return (
      <div />
    );
  }

}

export default connect(
  (state) => ({
    videos: videoData(state)
  }),
  dispatch => ({
    getVideos: () => dispatch(getVideosThunk())
  })
)(VideoColumns);
