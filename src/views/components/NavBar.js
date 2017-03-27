import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVideosThunk, videoData, pathName } from './../../state';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      linkColor: 'black'
    }
    this.renderList = this.renderList.bind(this);
    this.changeLinkColor = this.changeLinkColor.bind(this);
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

  changeLinkColor(linkColor) {
    this.setState({
      linkColor
    })
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
            <Link to={`${item.uri}`} onClick={() => this.changeLinkColor('#B2B0B0')} key={idx} style={{color: this.state.linkColor, textDecoration: 'none'}} activeStyle={{color: 'black'}}>{item.name}</Link>
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
      menu = <ul style={{margin: '0', padding: '10px'}}>{ this.renderList() }</ul>;
    } else {
      menu = null;
    }
    return (
      <div className="navigation-bar" style={{maxWidth: '225px', margin: '5vh 0 0 2.5vw'}}>
        <Link onClick={() => this.changeLinkColor('black')} to={'/'} style={{color: 'black', textDecoration: 'none', fontSize: '1.5em', fontWeight: 'bold'}}>{title}</Link>
        <div className="client-section" style={{marginTop: '10px'}}>
          <h3 onClick={this.handleClick.bind(this)} style={{cursor: 'pointer', maxWidth: '75px', margin: '0'}}>Client</h3>
          { menu }
        </div>
        <div className="personal-section">
          <h3 style={{cursor: 'pointer', maxWidth: '75px', margin: '0'}}>Personal</h3>
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
