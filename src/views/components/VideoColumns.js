import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getVideosThunk, videoData } from './../../state';
import { WindowResizeListener } from 'react-window-resize-listener';
import FontAwesome from 'react-fontawesome';

class VideoColumns extends Component {
  constructor() {
    super()
    this.state = {
      windowSize: { },
    }
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
  }

  hoverEvent(value, idx) {
    this.setState({ [idx]: value })
  }

  windowResize(windowSize) {
    this.setState({ windowSize })
  }

  renderList() {
    let featuredVideos = [];
    if (this.props.videos) {
      featuredVideos = this.props.videos.map(item => {
        if(item.tags.filter(tag => tag.name.includes('feature')).length > 0) {
          return item
        }
        return null;
      }).filter(item => item !== null)
    }

    return featuredVideos.map((item, idx) => {
      const thumbnail = item.pictures.sizes[5].link;
      const displayVersion = this.state[idx] || 'none';

      let columnWidth;
      if( this.state.windowSize.windowWidth < 750 ) {
        columnWidth = 100;
      } else {
        columnWidth = 100 / featuredVideos.length;
      }

      return(
        <div
          className="video-column"
          ref="VideoColumns"
          key={idx}
          onMouseOver={() => this.hoverEvent('block', idx)}
          onMouseOut={() => this.hoverEvent('none', idx)}
          style={{background: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center center', height: '100vh', width: `${columnWidth}vw`, position: 'relative'}} >
          <Link
            className="video-column-link"
            to={`${item.uri}`}
            style={{display: `${displayVersion}`, position: 'absolute', fontStyle: 'italic', width: '100px', height: 'auto', margin: '0 auto', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)', textAlign: 'center', textDecoration: 'none'}} >
            <FontAwesome name="play" size="3x" />
          </Link>
        </div>
      )
    });
  }

  render() {

    return (
      <div className="video-column-container" style={{display: 'flex', position: 'fixed', height: '100vh', width: '100vw', margin: '0'}}>
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
