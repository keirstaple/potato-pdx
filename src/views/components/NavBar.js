import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVideosThunk, videoData, pathName } from './../../state';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.renderList = this.renderList.bind(this);
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.getVideos();
    console.log('sent for data');
  }

  componentDidMount() {
    if(this.props.pathname.includes('videos')) {
      this.setState({
        isOpen: true
      })
    }
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderList() {
    if(this.props.videos) {
      return this.props.videos.sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      }).map((item, idx) => {
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
    let title = "Potato//Potato";
    let menu = null;
    if(this.state.isOpen) {
      menu = <ul>{ this.renderList() }</ul>;
    } else {
      menu = null;
    }
    return (
      <div>
        <div>
          <Link to={'/'} style={{color: 'black', textDecoration: 'none', size: '1.25em'}}>{title}</Link>
          <div className="client-section">
            <h3 onClick={this.handleClick.bind(this)} style={{cursor: 'pointer', maxWidth: '75px'}}>Client</h3>
            { menu }
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
    videos: videoData(state),
    pathname: pathName(state)
  }),
  dispatch => ({
    getVideos: () => dispatch(getVideosThunk())
  })
)(NavBar);
