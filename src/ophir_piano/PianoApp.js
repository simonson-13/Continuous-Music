import React from 'react';
import 'react-piano/dist/styles.css';

import InteractiveDemoFireBase from './InteractiveDemoFireBase';
import './PianoApp.css';

import _ from 'lodash';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';

// import SoundfontProvider from './SoundfontProvider';
// import PianoWithRecording from './PianoWithRecording';
// import PlaybackDemo from './PlaybackDemo';
// import { lostWoods } from './songs';
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

class PianoApp extends React.Component {

  render() {
    return (
      <div>
        {/** <Header />  */}
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-8 offset-md-2">
              <InteractiveDemoFireBase audioContext={audioContext} soundfontHostname={soundfontHostname} />
            </div>
          </div>
          {/* <hr className="mt-5" />
          <div className="row mt-5">
            <div className="col-md-8 offset-md-2">
              <PlaybackDemo
                audioContext={audioContext}
                soundfontHostname={soundfontHostname}
                song={lostWoods}
              />
            </div>
          </div> */}
        </div>
        {/*
        <div className="container">
          <hr className="mt-5" />
          <div className="col-md-8 offset-md-2">
            <h1 className="h3">react-piano recording + playback demo</h1>
            <div className="row mt-5">
              <div className="col-md-8 offset-md-3">
                <SoundfontProvider
                  instrumentName="acoustic_grand_piano"
                  audioContext={audioContext}
                  hostname={soundfontHostname}
                  render={({ isLoading, playNote, stopNote }) => (
                    <PianoWithRecording
                      recording={this.state.recording}
                      setRecording={this.setRecording}
                      noteRange={noteRange}
                      width={300}
                      playNote={playNote}
                      stopNote={stopNote}
                      disabled={isLoading}
                      keyboardShortcuts={keyboardShortcuts}
                    />
                  )}
                />
                <div className="mt-5">
              <button onClick={this.onClickPlay}>Play</button>
              <button onClick={this.onClickStop}>Stop</button>
              <button onClick={this.onClickClear}>Clear</button>
            </div>
            
              </div>
            </div>
            <div className="mt-5">
              <strong>Recorded notes</strong>
              <div>{JSON.stringify(this.state.recording.events)}</div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default PianoApp;
