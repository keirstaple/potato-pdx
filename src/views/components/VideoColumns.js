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
    // console.log('idx', idx);
    // const linkDisplay = `linkDisplay${idx}`;
    // console.log('linkDisplay', linkDisplay);
    // const stateDisplay = 'this.state.linkDisplay'+idx;
    // console.log('stateDisplay', stateDisplay)
    // if(stateDisplay === 'none') {
    //   this.setState({ [linkDisplay]: 'block' })
    //   console.log('state', this.state)
    // } else {
    //   this.setState({ [linkDisplay]: 'none' })
    //   console.log('state', this.state)
    // }
    if(value === undefined) {
      value = 'none'
    }
    this.setState({ [idx]: value })
    console.log(value);
    return value
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
    console.log('featuredVideos', featuredVideos)
    return featuredVideos.map((item, idx) => {
      const thumbnail = item.pictures.sizes[5].link;
      const columnWidth = 100 / featuredVideos.length
      // let displayVersion = this.hoverEvent();
      // console.log('displayVersion', displayVersion)
      const displayVersion = this.state[idx] || 'none';
      console.log('displayVersion', displayVersion)
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
