import React, { Component } from 'react';
import 'react-piano/dist/styles.css';

import InteractiveDemoFireBase from './InteractiveDemoFireBase.js';
import './PianoApp.css';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

class PianoApp extends Component {
  render() {
    return (
        <div
          className="container"
          style={{color:"lightgray", fontWeight: "bold"}}>
          <div className="row mt-0">
            <div className="col-md-8 offset-md-2">
              <InteractiveDemoFireBase
                audioContext={audioContext}
                soundfontHostname={soundfontHostname}
                instrument={this.props.instrument}
                showPiano={this.props.showPiano}
                userID={this.props.userID}
                isRecording={this.props.isRecording}
                startTime={this.props.startTime}
                tempStrFun={this.props.tempStrFun}
                userRef={this.props.userRef}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default PianoApp;
