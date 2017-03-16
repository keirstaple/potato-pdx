import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentWillMount() {
    //grabs posts when component loads
    this.props.fetchData();
  }

  renderList() {
    console.log('props ', this.props);
    return this.props.videos.map((item, idx) => {
      return(
        <Link to={`/${item.name}`} key={idx}>{item.name}</Link>
      )
    });
  }

  render(){
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

function mapStateToProps(state) {
  console.log('state ', state)
  return { videos: state.videos.data };
}

export default connect(mapStateToProps, { fetchData })(NavBar);
