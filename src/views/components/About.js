import React, {Component} from 'react';

class About extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     position: this.props.position,
  //   }
  // }
  render() {
    return (
      <div style={{ position: 'relative'}}>
        <div style={{ position: 'absolute', margin: '40vh auto', textAlign: 'center', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
          <h1>CONTACT US</h1>
          <hr />
          <a href="mailto:Info@potatoportland.com" style={{ textDecoration: 'none', color: 'black' }}>Email: Info@potatoportland.com</a>
        </div>
      </div>
    );
  }

}

export default About;
