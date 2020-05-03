import React, { Component } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';

import DimensionsProvider from './DimensionsProvider';
import SoundfontProvider from './SoundfontProvider';
import PianoConfig from './PianoConfig';
import * as firebase from 'firebase'; // import firebase!


const properToShortName = {
                            'acoustic_grand_piano':'piano',
                            'cello':'cello',
                            'acoustic_guitar_nylon':'guitar',
                            'trumpet':'trumpet',
                            'xylophone':'xylophone'
                          };

class InteractiveDemoFireBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        instrumentName: this.props.instrument,
        noteRange: {
          first: MidiNumbers.fromNote('c3'),
          last: MidiNumbers.fromNote('f5'),
        },
        keyboardShortcutOffset: 0,
      },
      activeNotes: [],
      midiData: {},
    };
    this.dbRef = firebase.database().ref();
    let instName = this.props.instrument ? this.props.instrument : 'piano';
    this.dbLiveInstRef = this.dbRef.child('live').child(instName);

    this.startTime = 0;
    // this.notes = [];
    this.notes = new Array(127).fill(0);
    this.tempStr = "";
    this.idNum = this.props.userID;
  }

  componentDidMount() {
    let instName = this.props.instrument ? this.props.instrument : 'piano';
    this.dbLiveInstRef = this.dbRef.child('live').child(instName);
    // Try connecting to MIDI controller
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(this.onMIDISuccess, this.onMIDIFailure);
    } else {
      console.warn("No MIDI support in your browser")
    }
  }

  // on success
  onMIDISuccess = (midi_data) => {
    // this is all our MIDI data
    this.setState({
      midiData: midi_data
    })
    var allInputs = this.state.midiData.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = allInputs.next(); input && !input.done; input = allInputs.next()) {
      // when a MIDI value is received call the onMIDIMessage function
      input.value.onmidimessage = this.gotMIDImessage;
    }
  }

  // handle midi event
  gotMIDImessage = (messageData) => {
    if (messageData.data[0] === 144) {  // handle pressing key
      this.onPlayNoteInput(messageData.data[1], { undefined });  // handle note number
    } else {  // handle releasing key
      this.onStopNoteInput(messageData.data[1], { undefined });
    }
  }

  // on failure
  onMIDIFailure = () => {
    console.warn("Not recognising MIDI controller")
  }

  onPlayNoteInput = (midiNumber, { prevActiveNotes }) => {
    let instName = this.props.instrument ? this.props.instrument : 'piano';
    this.dbLiveInstRef = this.dbRef.child('live').child(properToShortName[instName]);
    this.dbLiveInstRef.child(midiNumber).set(1);

    //simon added
    if (this.notes[midiNumber] == 0) {
      var d = new Date();
      this.notes[midiNumber] = d.getTime();
    }
    //end: simon added
  }

  onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    let instName = this.props.instrument ? this.props.instrument : 'piano';
    this.dbLiveInstRef = this.dbRef.child('live').child(properToShortName[instName]);
    this.dbLiveInstRef.child(midiNumber).set(0);

    if (this.props.isRecording){
      var d = new Date();

      var timePassed = this.notes[midiNumber] - this.props.startTime;
      var note = midiNumber;
      var duration = d.getTime() - this.notes[midiNumber];

      var tempStr = "" + timePassed + "," + note + "," + duration + "\n";
      this.props.tempStrFun(tempStr); //appending to other existing notes
    }
    this.notes[midiNumber] = 0; //reset start time for note
  }

  render() {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.state.config.noteRange.first + this.state.config.keyboardShortcutOffset,
      lastNote: this.state.config.noteRange.last + this.state.config.keyboardShortcutOffset,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      [<SoundfontProvider
        audioContext={this.props.audioContext}
        instrumentName={this.props.instrument}
        hostname={this.props.soundfontHostname}
        render={({ isLoading, playNote, stopNote, stopAllNotes }) =>
            (this.props.showPiano) ?
            (
              <div>
                <div className="mt-2">
                  <DimensionsProvider>
                    {({ containerWidth }) => (
                      <Piano
                        noteRange={this.state.config.noteRange}
                        keyboardShortcuts={keyboardShortcuts}
                        playNote={playNote}
                        stopNote={stopNote}
                        onPlayNoteInput={this.onPlayNoteInput}
                        onStopNoteInput={this.onStopNoteInput}
                        activeNotes={this.state.activeNotes}
                        disabled={isLoading}
                        width={containerWidth}
                      />
                    )}
                  </DimensionsProvider>
                </div>
                <div className="row mt-3">
                  <div className="col-lg-8 offset-lg-2">
                    Selected Instrument: {this.props.instrument}

                    <PianoConfig
                      config={this.state.config}
                      setConfig={(config) => {
                        this.setState({
                          config: Object.assign({}, this.state.config, config),
                        });
                        stopAllNotes();
                      }}
                      instrumentName={[this.state.config.instrumentName]}
                      keyboardShortcuts={keyboardShortcuts}
                    />
                  </div>
                </div>
              </div>
            ) :
            (
              <div>

              </div>
            )
        }
      />]
    );
  }
}

export default InteractiveDemoFireBase;
