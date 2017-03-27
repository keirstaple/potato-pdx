import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { videoData, pathName } from '../../state';

class NextButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  handleClick() {
    let { videos, pathname } = this.props;
    return this.nextVideo(videos, pathname)
  }

  nextVideo(videos, pathname) {
    let matchingUri = []
    for(let i = 0; i < videos.length; i++) {
      if(videos[i].uri === pathname && i !== videos.length-1) {
        matchingUri.push(videos[i+1].uri);
      } else if(i === videos.length-1) {
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
