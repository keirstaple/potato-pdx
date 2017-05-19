import React, {Component} from 'react';

class About extends Component {
  render() {
    return (
      <div style={{ position: 'relative'}}>
        <div style={{ display: `${this.props.display}`, position: 'absolute', margin: '40vh auto', textAlign: 'center', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
          <h1 className="contact-us" style={{ color: '#E89CBA', textShadow: '-7.5px 7.5px #1A1919'}}>CONTACT US</h1>
          <hr />
          <a className="email" href="mailto:Info@potatoportland.com" style={{ textDecoration: 'none', color: 'black' }}>Email: Info@potatoportland.com</a>
        </div>

      </div>
    );
  }

}

export default About;
