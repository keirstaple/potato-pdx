import React, {Component} from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    return this.props.data.map((item, idx) => {
      return(
        <li key={idx}>{item.name}</li>
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

export default NavBar;
