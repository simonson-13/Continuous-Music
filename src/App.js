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
    // Get user count
    let userCount = 0;
    firebase.database().ref('/presence/').once('value', snap => {
      userCount = snap.numChildren() - 1;
    })
    this.state = {
      instrumentSelected: false,
      instrument: "",
      showInfo: false,
      showPiano: false,
      showBar: false,
      showChat: false,
      usernameSet: false,
      username: "",
      userCount: userCount,
      userID: Math.floor((Math.random() * 10000)),
      isRecording: false,
      startTime: 0,
      tempStr: "",
    };
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


    listRef.on('value', snap => {
      this.setState({
        userCount: snap.numChildren() - 1
      })
    })
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

  handleIsRecording = (isRecording) => {
    var d = new Date();
    this.setState({
      isRecording: isRecording,
      startTime: d.getTime(),
    })
  }

  handleTempStr = (toAppend) => {
    if(toAppend == -1) {
      this.setState({
        tempStr: "",
      });
    } else if(toAppend == -2) {
      return this.state.tempStr;
    } else {
      this.setState({
        tempStr: (this.state.tempStr + toAppend),
      });
    }
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
      <div className="App">

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
          userCount={this.state.userCount}
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
          userID={this.state.userID}
          isRecording={this.state.isRecording}
          startTime={this.state.startTime}
          tempStrFun={this.handleTempStr}
        />

        <Bar
          className="toolbar"
          handleClickPiano={this.handleClickPiano}
          showBar={this.state.showBar}
          handleBarChange={this.handleBarChange}
          isRecordingFun={this.handleIsRecording}
          tempStrFun={this.handleTempStr}
          tempStr={this.state.tempStr}
          userID={this.state.userID}
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
//hello
export default App;
