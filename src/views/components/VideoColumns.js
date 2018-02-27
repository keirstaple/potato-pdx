import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getVideosThunk, videoData } from './../../state';
import { WindowResizeListener } from 'react-window-resize-listener';
import FontAwesome from 'react-fontawesome';
import _ from 'lodash';
import getUrls from 'get-urls';
import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

class VideoColumns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowSize: { },
    };
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
  }

  hoverEvent(value, idx) {
    this.setState({ [idx]: value });
  }

  windowResize(windowSize) {
    this.setState({ windowSize });
  }

  renderList() {
    const { videos } = this.props;
    const featuredVideos = _.filter(
      videos,
      video => {
        const urlTags = _.filter(
          video.tags,
          tag => tag.name === `${env.REACT_APP_VIMEO_ENVIRONMENT}`,
        );
        if(!_.isEmpty(urlTags)) {
          return video;
        }
      }
    );
    return featuredVideos.map((item, idx) => {
      let columnWidth;
      let columnHeight;
      let displayVersion;
      let iconSize;

      const thumbnails = [];
      getUrls(item.description).forEach(item => thumbnails.push(item));
      const thumbnail = thumbnails ? thumbnails[0] : '';

      if (this.state.windowSize.windowWidth < 750 ) {
        columnWidth = 100;
        columnHeight = 100 / featuredVideos.length;
      } else {
        columnWidth = 100 / featuredVideos.length;
        columnHeight = 100;
      }

      if (this.state.windowSize.windowWidth < 750) {
        displayVersion = 'block';
        iconSize = '2x';
      } else if (this.state.windowSize.windowWidth >= 750) {
        displayVersion = this.state[idx] || 'none';
        iconSize = '3x';
      }

      return(
        <div
          className="video-column"
          ref="VideoColumns"
          key={idx}
          onMouseOver={() => this.hoverEvent('block', idx)}
          onMouseOut={() => this.hoverEvent('none', idx)}
          style={{
            background: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            height: `${columnHeight}%`,
            width: `${columnWidth}%`,
            position: 'relative',
          }}
        >
          <Link
            className="video-column-link"
            to={`${item.uri}`}
            style={{
              display: `${displayVersion}`,
              position: 'absolute',
              fontStyle: 'italic',
              width: '100px',
              height: 'auto',
              margin: '0 auto',
              top: '50%',
              left: '50%',
              WebkitTransform: 'translate(-50%, -50%)',
              MsTransform: 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              textDecoration: 'none'
            }}
          >
            <FontAwesome name="play" size={`${iconSize}`} />
          </Link>
        </div>
      )
    });
  }

  render() {
    return (
      <div
        className="video-column-container"
        style={{
          display: 'flex',
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          margin: '0'
        }}
      >
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        { this.renderList() }
      </div>
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
