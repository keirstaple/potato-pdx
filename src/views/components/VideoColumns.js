import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getVideosThunk, videoData } from './../../state';

class VideoColumns extends Component {
  constructor() {
    super()
    this.state = { }
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
  }

  hoverEvent(value, idx) {
    this.setState({ [idx]: value })
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
      const columnWidth = 100 / featuredVideos.length
      const displayVersion = this.state[idx] || 'none';
      return(
          <div
            className="video-column"
            to={`${item.uri}`}
            key={idx}
            onMouseOver={() => this.hoverEvent('block', idx)}
            onMouseOut={() => this.hoverEvent('none', idx)}
            style={{backgroundImage: `url(${thumbnail})`, backgroundPosition: 'center', height: '100vh', width: `${columnWidth}vw`}}>
            <Link className="video-column" style={{display: `${displayVersion}`, color: 'white', border: 'solid 5px white'}}>Watch Me</Link>
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
