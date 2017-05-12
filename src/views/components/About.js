import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

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
          <h1 className="contact-us">CONTACT US</h1>
          <hr />
          <a className="email" href="mailto:Info@potatoportland.com" style={{ textDecoration: 'none', color: 'black' }}>Email: Info@potatoportland.com</a>
        </div>
        <FontAwesome name="play" size="4x" style={{ WebkitTransform: 'rotate(90deg)', MsTransform: 'rotate(90deg)', transform: 'rotate(90deg)', color: 'white', position: 'absolute', left: '50%', top: '97vh', zIndex: '6' }} />
      </div>
    );
  }

}

export default About;
