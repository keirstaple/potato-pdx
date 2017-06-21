import React, {Component} from 'react';
import { WindowResizeListener } from 'react-window-resize-listener';
import ReactGA from 'react-ga';
import facebook from '../../../public/images/facebook.svg';
import instagram from '../../../public/images/instagram.svg';
import vimeo from '../../../public/images/vimeo.svg';
import mail from '../../../public/images/mail.svg';
// import akkuratBold from '../fonts/Akkurat-Bold.ttf';
// import akkuratLight from '../fonts/Akkurat-Light.ttf';

const handleOutbound = (eventLabel) => {
  ReactGA.event({
    category: 'Outbound',
    action: 'click',
    label: eventLabel
  });
};

const OutLink = ({ children, to, label, ...restProps }) => {
  return (
    <a {...restProps} href={to} target="_blank" onClick={() => handleOutbound(label)}>{children}</a>
  );
};

class About extends Component {
  constructor() {
    super();
    this.state = {
      multiplier: 1,
      margin: '40vh auto',
      aboutWidth: '450px',
    }
  }

  windowResize(windowSize) {
    this.setState({ windowSize });

    if(windowSize.windowWidth < 414) {
      this.setState({ multiplier: 0.5, aboutWidth: '200px', margin: '55vh auto' });
    }
  }
  render() {
    const multiplier = this.state.multiplier;
    return (
      <div style={{ position: 'relative', width: `${this.state.aboutWidth}` }}>
        <WindowResizeListener onResize={windowSize => this.windowResize(windowSize)} />
        <div style={{ display: `${this.props.display}`, position: 'absolute', margin: `${this.state.margin}`, textAlign: 'center' }}>
          <h1 className="contact-us" style={{ fontSize: `${3*multiplier}em`}}>LET'S TALK</h1>
          <hr />
          <p className="about-us" style={{fontSize: `${1.25*multiplier}em`, margin: '10px 0' }}>Potato Potato is a video production company based in Portland, Oregon.</p>
          <span className="email-phone" style={{fontSize: `${1.25*multiplier}em`}}>
            <OutLink className="email" style={{ textDecoration: 'none', color: '#E4794A' }} label="mailto:Info@potatoportland.com" to="mailto:Info@potatoportland.com">Info@potatoportland.com</OutLink> &#47;&#47;
            <OutLink className="email" label="tel:503-758-4663" to="tel:503-758-4663" style={{ textDecoration: 'none', color: '#E4794A' }}> 503.758.4663</OutLink>
          </span>
          <div style={{ display: 'flex', marginTop: '25px', justifyContent: 'center', alignItems: 'center' }}>
            <OutLink
              className="social-icons"
              to="mailto:Info@potatoportland.com"
              label="mailto:Info@potatoportland.com">
              <img style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '0 10px'}} src={mail} alt="email" />
            </OutLink>
            <OutLink
              className="social-icons"
              to="https://vimeo.com/user58377879"
              label="https://vimeo.com/user58377879">
              <img style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '0 10px'}} src={vimeo} alt="vimeo" />
            </OutLink>
            <OutLink
              className="social-icons"
              to="https://www.facebook.com/potatopotatopdx/"
              label="https://www.facebook.com/potatopotatopdx/">
              <img style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '0 10px'}} src={facebook} alt="facebook" />
            </OutLink>
            <OutLink
              className="social-icons"
              to="https://www.instagram.com/potatopotatopdx/"
              label="https://www.instagram.com/potatopotatopdx/">
              <img style={{ cursor: 'pointer', height: `${5*multiplier}vh`, width: "auto", margin: '0 10px'}} src={instagram} alt="instagram" />
            </OutLink>
          </div>
        </div>
      </div>
    );
  }

}

export default About;
