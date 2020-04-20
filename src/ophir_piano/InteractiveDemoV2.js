import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import MdArrowDownward from 'react-icons/lib/md/arrow-downward';

import DimensionsProvider from './DimensionsProvider';
import InstrumentListProvider from './InstrumentListProvider';
import SoundfontProvider from './SoundfontProvider';
import PianoConfig from './PianoConfig';

// ============== start: added from PianoWithRecording.js ==
const DURATION_UNIT = 0.2;
const DEFAULT_NOTE_DURATION = DURATION_UNIT;
// ============== end: added from PianoWithRecording.js ====

class InteractiveDemo extends React.Component {
  state = {
    config: {
      instrumentName: 'acoustic_grand_piano',
      noteRange: {
        first: MidiNumbers.fromNote('c3'),
        last: MidiNumbers.fromNote('f5'),
      },
      keyboardShortcutOffset: 0,
      // ============================ start: added from PianoWithRecording.js 
      keysDown: {},
      noteDuration: DEFAULT_NOTE_DURATION,
      // ============================ end: added from PianoWithRecording.js 
    },
  };

  // ============================ start: added from PianoWithRecording.js ==
  static defaultProps = {
    notesRecorded: false,
  };

  /*state = {
    keysDown: {},
    noteDuration: DEFAULT_NOTE_DURATION,
  };*/

  onPlayNoteInput = midiNumber => {
    this.setState({
      notesRecorded: false,
    });
  };

  onStopNoteInput = (midiNumber, { prevActiveNotes }) => {
    if (this.state.notesRecorded === false) {
      this.recordNotes(prevActiveNotes, this.state.noteDuration);
      this.setState({
        notesRecorded: true,
        noteDuration: DEFAULT_NOTE_DURATION,
      });
    }
  };

  recordNotes = (midiNumbers, duration) => {
    if (this.props.recording.mode !== 'RECORDING') {
      return;
    }
    const newEvents = midiNumbers.map(midiNumber => {
      return {
        midiNumber,
        time: this.props.recording.currentTime,
        duration: duration,
      };
    });
    this.props.setRecording({
      events: this.props.recording.events.concat(newEvents),
      currentTime: this.props.recording.currentTime + duration,
    });
  };
  // ============================ end: added from PianoWithRecording.js ====

  render() {
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: this.state.config.noteRange.first + this.state.config.keyboardShortcutOffset,
      lastNote: this.state.config.noteRange.last + this.state.config.keyboardShortcutOffset,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
    
    // ============================ start: added from PianoWithRecording.js ==
    const {
      playNote,
      stopNote,
      recording,
      setRecording,
      ...pianoProps
    } = this.props;

    //const { mode, currentEvents } = this.props.recording;
    //const activeNotes = 
    // mode === 'PLAYING' ? currentEvents.map(event => event.midiNumber) : null;
    // ============================ end: added from PianoWithRecording.js ====

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
                    // ============== start: added from PianoWithRecording.js ==
                    /*playNote={this.props.playNote}
                    stopNote={this.props.stopNote}
                    onPlayNoteInput={this.onPlayNoteInput}
                    onStopNoteInput={this.onStopNoteInput}
                    activeNotes={activeNotes}
                    {...pianoProps}*/
                    // ============== end: added from PianoWithRecording.js ====
                      noteRange={this.state.config.noteRange}
                      keyboardShortcuts={keyboardShortcuts}
                      playNote={playNote}
                      stopNote={stopNote}
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

export default InteractiveDemo;
