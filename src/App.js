import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import InfoPage from './InfoPage/InfoPage.js'
import Visualization from './Visualization/Visualization.js'
import Bar from './Bar/Bar.js'
import PianoDrawer from './PianoDrawer/PianoDrawer.js'
import ChatDrawer from './ChatDrawer/ChatDrawer.js'
import LivePlayBack from './Piano/LivePlayBack.js';
import LiveLoop from './Piano/LiveLoop.js';
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
      userRef: null,
      userHash: null,
      allUsersRef: firebase.database().ref("/presence/"),
      usernameSet: false,
      username: "",
      userCount: userCount,
      userID: Math.floor((Math.random() * 10000)),
      isRecording: false,
      startTime: 0,
      tempStr: "",
      isMutePressed: false
    };
    this.dbRef = firebase.database().ref();
  }

  // Set up user's entry on database
  componentWillMount() {
    var listRef = firebase.database().ref("/presence/"); 
    var userRef = listRef.push(); // create a user
    // update our state
    this.setState({
      userRef: userRef,
      allUsersRef: listRef,
      userHash: userRef.key
    });

    // Add ourselves to presence list when online.
    var presenceRef = firebase.database().ref("/.info/connected");
    presenceRef.on("value", function(snap) {
      if (snap.val()) {
        // Remove ourselves when we disconnect.
        userRef.onDisconnect().remove();
        // create array of midi notes (prev and current values)
        // in user's entry in database
        userRef.child('midi').set(Array(128).fill({
          'prev_value': 0,
          'value': 0
        }));
      }
    });

    // Set event handler for our userCount
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
    // Set user's instrument on their database entry
    this.state.userRef.child('instrument').set(instrument);
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
    if(toAppend === -1) {
      this.setState({
        tempStr: "",
      });
    } else if(toAppend === -2) {
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

  handleMutePressed = () => { 
    this.setState({
      isMutePressed: !this.state.isMutePressed
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
          audioContext={audioContext}
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
          showPiano={this.state.showBar}
          userID={this.state.userID}
          userRef={this.state.userRef}
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
          audioContext={audioContext}
          instrument={this.state.instrument}
          isMutePressed={this.state.isMutePressed}
          handleMutePressed={this.handleMutePressed}
        />

        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'acoustic_grand_piano'}
          hostname={soundfontHostname}
          userHash={this.state.userHash}
          allUsersRef={this.state.allUsersRef}
          isMutePressed={this.state.isMutePressed}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'cello'}
          hostname={soundfontHostname}
          userHash={this.state.userHash}
          allUsersRef={this.state.allUsersRef}
          isMutePressed={this.state.isMutePressed}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'trumpet'}
          hostname={soundfontHostname}
          userHash={this.state.userHash}
          allUsersRef={this.state.allUsersRef}
          isMutePressed={this.state.isMutePressed}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'acoustic_guitar_nylon'}
          hostname={soundfontHostname}
          userHash={this.state.userHash}
          allUsersRef={this.state.allUsersRef}
          isMutePressed={this.state.isMutePressed}
        />
        <LivePlayBack
          audioContext={audioContext}
          instrumentName={'xylophone'}
          hostname={soundfontHostname}
          userHash={this.state.userHash}
          allUsersRef={this.state.allUsersRef}
          isMutePressed={this.state.isMutePressed}
        />

        <LiveLoop
          audioContext={audioContext}
          isMutePressed={this.state.isMutePressed}
        />
      </div>
    );
  }
}
//hello
export default App;
