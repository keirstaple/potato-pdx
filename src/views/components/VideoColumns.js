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
        if(item.tags.filter(tag => tag.name.indexOf("feature") > -1).length > 0) {
          console.log('item tag', item)
          return item
        }
        return null;
      }).filter(item => item !== null)
    }

    return featuredVideos.sort((a, b) => parseFloat(a.tags[a.tags.length-1].tag) - parseFloat(b.tags[b.tags.length-1].tag)).map((item, idx) => {
      console.log('item', item)
      // const thumbnail = item.pictures.sizes[5].link;
      let thumbnail;
      let columnWidth;
      let columnHeight;
      let displayVersion;
      let iconSize;

      // thumbnail = item.pictures.sizes[5].link;
      if(item.name === "Willamette Valley Vineyards Pork Ribs") {
        thumbnail = "https://c1.staticflickr.com/5/4157/34021668473_295306fc70_o.jpg";
      } else if(item.name === "Pearl Tavern") {
        thumbnail = "https://c1.staticflickr.com/5/4274/34851654802_d90d0dc4f7_o.jpg";
      } else if(item.name === "COLTY Fashion Show Intro") {
        thumbnail = "https://c1.staticflickr.com/5/4219/34851655732_ecd49b087f_o.jpg"
      }

      if( this.state.windowSize.windowWidth < 750 ) {
        columnWidth = 100;
        columnHeight = 100 / featuredVideos.length;
      } else {
        columnWidth = 100 / featuredVideos.length;
        columnHeight = 100;
      }

      if(this.state.windowSize.windowWidth < 750) {
        displayVersion = 'block';
        iconSize = '2x';
        // console.log('iconSize', iconSize)
      } else if(this.state.windowSize.windowWidth >= 750) {
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
          style={{background: `url(${thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center center', height: `${columnHeight}vh`, width: `${columnWidth}vw`, position: 'relative'}} >
          <Link
            className="video-column-link"
            to={`${item.uri}`}
            style={{display: `${displayVersion}`, position: 'absolute', fontStyle: 'italic', width: '100px', height: 'auto', margin: '0 auto', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)', textAlign: 'center', textDecoration: 'none'}} >
            <FontAwesome name="play" size={`${iconSize}`} />
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
