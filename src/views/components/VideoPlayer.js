import React, { Component, PropTypes } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { VideoColumns } from '../index';

import { videoId } from './../../state';

class VideoPlayer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  renderVideo() {
    return(
      <ReactPlayer url={`https://vimeo.com/${this.props.videoId}`} height='500px' width='800px' style={{position: 'absolute', left: '50%', top: '50%', marginLeft: '-30vw', marginTop: '-35vh'}} />
    )
  }

  handleClick() {
    return this.context.router.push('/');
  }

  render() {
    return(
      <div>
        <VideoColumns />
        <div style={{position: 'absolute', height: '100vh', width: '97.6vw', marginTop: '-100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: '1'}}>
          <FontAwesome
            className="times-icon"
            name="window-close-o"
            size="2x"
            style={{color: 'white', position: 'absolute', left: '50%', top: '50%', marginLeft: '40vw', marginTop: '-40vh', zIndex: '2'}}
            onClick={this.handleClick.bind(this)}
          />
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
