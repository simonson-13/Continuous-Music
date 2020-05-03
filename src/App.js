import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import InfoPage from './InfoPage/InfoPage.js'
import Visualization from './Visualization/Visualization.js'
import Bar from './Bar/Bar.js'
import PianoDrawer from './PianoDrawer/PianoDrawer.js'
import ChatDrawer from './ChatDrawer/ChatDrawer.js'
import LivePlayBack from './ophir_piano/LivePlayBack.js';
import * as firebase from 'firebase'; // import firebase!

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';



class App extends Component {
  constructor() {
    super()
    this.state = {
      instrumentSelected: false,
      instrument: "",
      showInfo: false,
      showPiano: false,
      showBar: false,
      showChat: false,
      usernameSet: false,
      username: "",
    }
    this.dbRef = firebase.database().ref();
  }

  componentDidMount() {
    var listRef = firebase.database().ref("/presence/");
    var userRef = listRef.push();

    // Add ourselves to presence list when online.
    var presenceRef = firebase.database().ref("/.info/connected");
    presenceRef.on("value", function(snap) {
      if (snap.val()) {
        // Remove ourselves when we disconnect.
        userRef.onDisconnect().remove();
        userRef.set(true);
      }
    });
  }

  handleInstrumentClick(instrument) {
    this.setState({
      instrumentSelected: true,
      instrument: instrument
    })
  }

  handleOpenInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  handleCloseInfo = () => {
    this.setState({
      showInfo: false
    })
  }

  handleClickPiano = () => {
    this.setState({
      showPiano: !this.state.showPiano
    })
  }

  handleBarChange = () => {
    this.setState({
      showBar: !this.state.showBar
    })
  }

  handleChatChange = () => {
    this.setState({
      showChat: !this.state.showChat
    })
  }

  handleCloseChat = () => {
    this.setState({
      showChat: false
    })
  }

  handleUsernameSubmit = (username) => {
    this.setState({
      username: username,
      usernameSet: true
    })
  }

  render() {
    return (
      <div className="App" onbeforeunload="this.liveUserCountRef.once('value').then(snap =>{
        this.liveUserCountRef.set(snap.val() - 1);
      });">

        <InstrumentSelection
          open={!this.state.instrumentSelected}
          onClick={instrument => this.handleInstrumentClick(instrument)}
        />

        <InfoPage
          open={this.state.showInfo}
          onOpen={this.handleOpenInfo}
          onClose={this.handleCloseInfo}
        />

        <Visualization
          openInfo={this.handleOpenInfo}
          handleBarChange={this.handleBarChange}
          handleChatChange={this.handleChatChange}
        />

        <ChatDrawer
          showChat={this.state.showChat}
          handleCloseChat={this.handleCloseChat}
          username={this.state.username}
          usernameSet={this.state.usernameSet}
          handleUsernameSubmit={this.handleUsernameSubmit}
        />

        <PianoDrawer
          instrument={this.state.instrument}
          //showPiano={this.state.showPiano}
          showPiano={this.state.showBar}
        />

        <Bar
          className="toolbar"
          handleClickPiano={this.handleClickPiano}
          showBar={this.state.showBar}
          handleBarChange={this.handleBarChange}
        />

        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'piano'}
          hostname={soundfontHostname}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'cello'}
          hostname={soundfontHostname}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'trumpet'}
          hostname={soundfontHostname}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'guitar'}
          hostname={soundfontHostname}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'xylophone'}
          hostname={soundfontHostname}
        />
      </div>
    );
  }
}

export default App;
