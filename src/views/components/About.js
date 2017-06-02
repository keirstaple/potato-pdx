import React, {Component} from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import facebook from '../../../public/images/facebook.svg';
import instagram from '../../../public/images/instagram.svg';
import vimeo from '../../../public/images/vimeo.svg';
import mail from '../../../public/images/mail.svg';
// import akkuratBold from '../fonts/Akkurat-Bold.ttf';
// import akkuratLight from '../fonts/Akkurat-Light.ttf';


class About extends Component {
  constructor() {
    super();
    this.state = {
      multiplier: 1,
      margin: '40vh auto'
    }
  }

  windowResize(windowSize) {
    this.setState({ windowSize });

    if(windowSize.windowWidth < 414) {
      this.setState({ multiplier: 0.5, margin: '35vh auto' })
    }
  }
  render() {
    const multiplier = this.state.multiplier;
    return (
      <div style={{ position: 'relative'}}>
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        <div style={{ display: `${this.props.display}`, position: 'absolute', margin: `${this.state.margin}`, textAlign: 'center', top: '50%', left: '50%', WebkitTransform: 'translate(-50%, -50%)', MsTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
          <h1 className="contact-us" style={{fontSize: `${3.25*multiplier}em`}}>CONTACT US</h1>
          <hr />
          <a className="email" href="mailto:Info@potatoportland.com" style={{fontSize: `${1.5*multiplier}em`}}>Email: Info@potatoportland.com</a>
          <div style={{ display: 'flex', marginTop: '15px', justifyContent: 'center', alignItems: 'center' }}>
            <a href="mailto:Info@potatoportland.com" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '10px'}} src={mail} alt="email" /></a>
            <a href="https://vimeo.com/user58377879" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '10px'}} src={vimeo} alt="vimeo" /></a>
            <a href="https://www.facebook.com/potatopotatopdx/" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '10px'}} src={facebook} alt="facebook" /></a>
            <a href="https://www.instagram.com/potatopotatopdx/" target="_blank"><img className="social-icons" style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '10px'}} src={instagram} alt="instagram" /></a>
          </div>
        </div>
      </div>
    );
  }

}

export default About;
