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
      <div style={{ height: '90vh', width: '100vw', position: 'absolute', top: `${this.props.position}vh`, zIndex: '2', backgroundColor: 'white'}}>
        <h1>About Us</h1>
      </div>
    );
  }

}

export default About;
