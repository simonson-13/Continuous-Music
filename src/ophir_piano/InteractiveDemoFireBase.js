import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import MdArrowDownward from 'react-icons/lib/md/arrow-downward';

import DimensionsProvider from './DimensionsProvider';
import InstrumentListProvider from './InstrumentListProvider';
import SoundfontProvider from './SoundfontProvider';
import PianoConfig from './PianoConfig';

import * as firebase from 'firebase'; // import firebase!





class InteractiveDemoFireBase extends React.Component {
  
  
  /** ======================= START MY CODE BLOCK ========================  */
  constructor() {
    super();
    this.state = {
      config: {
        instrumentName: 'acoustic_grand_piano',
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
    this.liveRef = this.dbRef.child('live');
  }

  componentDidMount() {
    this.dbRef = firebase.database().ref();
    this.liveRef = this.dbRef.child('live');
    
    this.liveRef.on('value', snap => {
      let activeNotesDB = snap.val();
      let currentlyActiveNotes = []
      for (let note in activeNotesDB) {
        let noteNum = Number(note);
        if (activeNotesDB[noteNum] > 0){
          currentlyActiveNotes.push(noteNum);
        }
      }
      this.setState({
        activeNotes: currentlyActiveNotes
      }) 
      console.log(this.state.activeNotes)
    });

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
    this.state.midiData = midi_data;
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
      this.onPlayNoteInput(messageData.data[1], {undefined});  // handle note number
    } else {  // handle releasing key
      this.onStopNoteInput(messageData.data[1], {undefined});
    }
  }

  // on failure
  onMIDIFailure = () => {
    console.warn("Not recognising MIDI controller")
  }

  onPlayNoteInput = (midiNumber, { prevActiveNotes }) => {
    this.liveRef.child(midiNumber).set(1);
  }

  onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    this.liveRef.child(midiNumber).set(0);
  }

  /** ======================== END MY CODE BLOCK ========================  */

  render() {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.state.config.noteRange.first + this.state.config.keyboardShortcutOffset,
      lastNote: this.state.config.noteRange.last + this.state.config.keyboardShortcutOffset,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      <SoundfontProvider
        audioContext={this.props.audioContext}
        instrumentName={this.state.config.instrumentName}
        hostname={this.props.soundfontHostname}
        render={({ isLoading, playNote, stopNote, stopAllNotes }) => (
          <div>
            <div className="text-center">
              <p className="">Try it by clicking, tapping, or using your keyboard:</p>
              <div style={{ color: '#777' }}>
                <MdArrowDownward size={32} />
              </div>
            </div>
            <div className="mt-4">
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
            <div className="row mt-5">
              <div className="col-lg-8 offset-lg-2">
                <InstrumentListProvider
                  hostname={this.props.soundfontHostname}
                  render={(instrumentList) => (
                    <PianoConfig
                      config={this.state.config}
                      setConfig={(config) => {
                        this.setState({
                          config: Object.assign({}, this.state.config, config),
                        });
                        stopAllNotes();
                      }}
                      instrumentList={instrumentList || [this.state.config.instrumentName]}
                      keyboardShortcuts={keyboardShortcuts}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export default InteractiveDemoFireBase;
