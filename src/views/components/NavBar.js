import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVideosThunk, appData } from './../../state';

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
    console.log('props ', this.props);
    if(this.props.videos) {
      return this.props.videos.map((item, idx) => {
        return(
          <Link to={`/${item.name}`} key={idx}>{item.name}</Link>
        )
      });
    }
  }

  render() {
    let title = "Potato // Potato";
    return (
      <div>
        <div>
          <h2>{title}</h2>
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
    videos: state.app.videos.data
  }),
  dispatch => ({
    getVideos: () => dispatch(getVideosThunk())
  })
)(NavBar);
