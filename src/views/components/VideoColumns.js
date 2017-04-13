import React, {Component} from 'react';
import { connect } from 'react-redux';

import { getVideosThunk, videoData } from './../../state';

class VideoColumns extends Component {
  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
  }
  renderList() {
    let featuredVideos = [];
    if (this.props.videos) {
      featuredVideos = this.props.videos.map(item => {
        if(item.tags.filter(tag => tag.name.includes('feature')).length > 0) {
          return item
        }
      }).filter(item => item !== undefined)
    }
    console.log('featuredVideos', featuredVideos)
    return featuredVideos.map((item, idx) => {
      const thumbnail = item.pictures.sizes[5].link;
      const columnWidth = 100 / featuredVideos.length
      return(
        <div key={idx} style={{backgroundImage: `url(${thumbnail})`, backgroundPosition: 'center', height: '100vh', width: `${columnWidth}vw`}}>

        </div>
      )
    });
  }
  render() {
    return (
      <div style={{display: 'flex'}}>
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
