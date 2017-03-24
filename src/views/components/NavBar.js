import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVideosThunk, videoData } from './../../state';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
    console.log('sent for data');
  }

  renderList() {
    if(this.props.videos) {
      return this.props.videos.map((item, idx) => {
        console.log('item', item);
        return(
          <div key={idx}>
            <Link to={`${item.uri}`} key={idx} style={{color: '#B2B0B0', textDecoration: 'none'}} activeStyle={{color: 'black'}}>{item.name}</Link>
            <br></br>
          </div>
        )
      });
    }
  }

  render() {
    let title = "Potato // Potato";
    return (
      <div>
        <div>
          <Link to={'/'}>{title}</Link>
          <div className="client-section">
            <h3>Client</h3>
            <ul>
              { this.renderList() }
            </ul>
          </div>
        </div>
        <div className="personal-section">

        </div>
      </div>
    );
  }
}

NavBar.contextTypes = {
  router: React.PropTypes.object
}

export default connect(
  (state) => ({
    videos: videoData(state)
  }),
  dispatch => ({
    getVideos: () => dispatch(getVideosThunk())
  })
)(NavBar);
