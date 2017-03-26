import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { videoData, pathName } from '../../state';

//need to know current video, probably through app state
//use pathaname to match current video in app.videos array
//set next one to a variable
//on click link to that new uri
class NextButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleClick() {
    console.log('inside click')
    let { videos, pathname } = this.props;
    console.log('videos and pathname', videos, pathname)

    return this.nextVideo(videos, pathname)
  }

  nextVideo(videos, pathname) {
    let matchingUri = []
    console.log(videos.length)
    for(let i = 0; i < videos.length; i++) {
      if(videos[i].uri === pathname && i !== videos.length-1) {
        matchingUri.push(videos[i+1].uri);
      } else if(i === videos.length-1) {
        console.log('else')
        matchingUri.push(videos[0].uri)
      }
    }
    return this.context.router.push(`${matchingUri[0]}`);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Next</button>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    videos: videoData(state),
    pathname: pathName(state)
  }),
  null
)(NextButton);
