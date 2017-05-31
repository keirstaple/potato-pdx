import React, {Component} from 'react';
import facebook from '../images/facebook.svg';
import instagram from '../images/instagram.svg';
import vimeo from '../images/vimeo.svg';
import mail from '../images/mail.svg';
// import akkuratBold from '../fonts/Akkurat-Bold.ttf';
// import akkuratLight from '../fonts/Akkurat-Light.ttf';


class About extends Component {
  render() {
    return (
      <div style={{ position: 'relative'}}>
        <div style={{ display: `${this.props.display}`, position: 'absolute', margin: '40vh auto', textAlign: 'center', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
          <h1 className="contact-us">CONTACT US</h1>
          <hr />
          <a className="email" href="mailto:Info@potatoportland.com">Email: Info@potatoportland.com</a>
          <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
            <a href="mailto:Info@potatoportland.com" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: "5vh", width: "auto", margin: '10px'}} src={mail} alt="email" /></a>
            <a href="https://vimeo.com/user58377879" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: "5vh", width: "auto", margin: '10px'}} src={vimeo} alt="vimeo" /></a>
            <a href="https://www.facebook.com/potatopotatopdx/" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: "5vh", width: "auto", margin: '10px'}} src={facebook} alt="facebook" /></a>
            <a href="https://www.instagram.com/potatopotatopdx/" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: "5vh", width: "auto", margin: '10px'}} src={instagram} alt="instagram" /></a>
          </div>
        </div>
      </div>
    );
  }

}

export default About;
