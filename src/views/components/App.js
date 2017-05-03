import React, { Component } from 'react';
import { connect } from 'react-redux';
import { About, VideoColumns } from './../index';
import { initializeApp } from './../../state';

class App extends Component {
  constructor() {
    super();
    this.state = {
      transform: -85,
      scroll: 0,
    }
  }

  componentDidMount() {
    console.log('app mounted');
    window.addEventListener('scroll', this.handleScroll.bind(this));
    // let scrollHeight = document.getElementById("root").scrollHeight;
    // scrollHeight =  scrollHeight + window.innerHeight
    // console.log('height', scrollHeight)
    this.props.initializeApp();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    let scrollTop = event.srcElement.body.scrollTop;
    let scrollPosition = this.state.scroll;

    let itemTranslate = () => {
      let transform = this.state.transform;
      if(transform < 0 && scrollTop > scrollPosition) {
        transform++;
        this.setState({ transform, scroll: scrollTop })
      } else if(transform <= 0 && scrollTop < scrollPosition) {
        transform--;
        this.setState({ transform, scroll: scrollTop})
      }
      return transform;
    };

    itemTranslate()
    console.log('scrollTop', scrollTop);
    console.log('scrollPosition', scrollPosition);
    console.log('translate', itemTranslate);
    console.log('state', this.state.transform);
    // this.setState({
    //   transform: itemTranslate
    // });
  }

  render() {
    let scrollHeight = window.innerHeight * 2;
    return (
      <div className="App" style={{ height: `${scrollHeight}`, position: 'relative'}}>
        <About position={this.state.transform} />
        <VideoColumns />
        { this.props.children }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    appInitialized: state.app.appInitialized
  }),
  dispatch => ({
    initializeApp: () => dispatch(initializeApp())
  })
)(App);
