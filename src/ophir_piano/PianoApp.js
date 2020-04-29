import React, { Component } from 'react';
import 'react-piano/dist/styles.css';

import InteractiveDemoFireBase from './InteractiveDemoFireBase.js';
import './PianoApp.css';

import _ from 'lodash';
import { KeyboardShortcuts, MidiNumbers } from 'react-piano';

// import SoundfontProvider from './SoundfontProvider';
// import PianoWithRecording from './PianoWithRecording';
// import PlaybackDemo from './PlaybackDemo';
// import InteractiveDemo from './InteractiveDemo';

// import * as firebase from 'firebase'; // import firebase!

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c3'),
  last: MidiNumbers.fromNote('f4'),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

class PianoApp extends Component {
  render() {
    return (
        <div className="container hello" >
          <div className="row mt-0">
            <div className="col-md-8 offset-md-2">
              <InteractiveDemoFireBase 
                audioContext={audioContext} 
                soundfontHostname={soundfontHostname}
                instrument={this.props.instrument} 
                showPiano={this.props.showPiano}  
              />
            </div>
          </div>  
        </div>
    );
  }
}

export default PianoApp;
