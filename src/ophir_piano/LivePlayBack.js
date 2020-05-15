// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';

class LivePlayBack extends React.Component {
  static propTypes = {
    instrumentName: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['mp3', 'ogg']),
    soundfont: PropTypes.oneOf(['MusyngKite', 'FluidR3_GM']),
    audioContext: PropTypes.instanceOf(window.AudioContext),
    onLoad: PropTypes.func,
    render: PropTypes.func,
  };

  static defaultProps = {
    format: 'mp3',
    soundfont: 'MusyngKite',
    instrumentName: 'acoustic_grand_piano',
  };

  constructor(props) {
    super(props);
    this.state = {
      activeAudioNodes: {},
      instrument: null,
    };
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
    this.props.allUsersRef.on('child_changed', (snap, prevKey) => {
      // only play this is the right instrument
      if (snap.val().instrument === this.props.instrumentName){
        // only play if the one playing IS NOT the current user
        if (snap.key !== this.props.userHash){
          let liveNotesDB = snap.val().midi;
          for (let note=0; note < liveNotesDB.length; note++){
            if (liveNotesDB[note] > 0) {  
              this.playNote(note);
            } else {
              this.stopNote(note);
            }
          }
        }
      }
    });
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName);
    // if a user was potentially added 
    this.props.allUsersRef.on('child_added', (snap, prevKey) => {
      // for each user currently online (or recently added)
      //    attach an event handler to their midi array
      //      if instrument is a match to current LiveLoop object's instrument
      //      AND if not looking at self
      let user_id = snap.key;
      let user = snap.val();
      if (user.instrument === this.props.instrumentName
          && user_id !== this.props.userHash) {
        // attach an event handler to each note in their midi array 
        for (let i=0; i<128; i++) {
          this.props.allUsersRef.child(user_id).child('midi').child(i)
          .on('value', noteSnap => {
            console.log('noteSnap.val()', noteSnap.val());
            if (noteSnap.val() == null) {
              return;
            }
            if (noteSnap.val().value > 0 && noteSnap.val().prev_value === 0) {
              this.playNote(i);
            } else {
              this.stopNote(i);
            }
          });
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName);
    }

    if (prevState.instrument !== this.state.instrument) {
      if (!this.props.onLoad) {
        return;
      }
      this.props.onLoad({
        playNote: this.playNote,
        stopNote: this.stopNote,
        stopAllNotes: this.stopAllNotes,
      });
    }
  }

  loadInstrument = (instrumentName) => {
    // Re-trigger loading state
    this.setState({
      instrument: null,
    });
    Soundfont.instrument(this.props.audioContext, instrumentName, {
      format: this.props.format,
      soundfont: this.props.soundfont,
      nameToUrl: (name, soundfont, format) => {
        return `${this.props.hostname}/${soundfont}/${name}-${format}.js`;
      },
    }).then((instrument) => {
      this.setState({
        instrument,
      });
    });
  };

  playNote = (midiNumber) => {
    var isMutePressed = this.props.isMutePressed;
    if (!isMutePressed) {  // if mute button is not pressed
      this.resumeAudio().then(() => {
        const audioNode = this.state.instrument.play(midiNumber);
        this.setState({
          activeAudioNodes: Object.assign({}, this.state.activeAudioNodes, {
            [midiNumber]: audioNode,
          }),
        });
      });
    }
  };

  stopNote = (midiNumber) => {
    this.resumeAudio().then(() => {
      if (!this.state.activeAudioNodes[midiNumber]) {
        return;
      }
      const audioNode = this.state.activeAudioNodes[midiNumber];
      audioNode.stop();
      this.setState({
        activeAudioNodes: Object.assign({}, this.state.activeAudioNodes, { [midiNumber]: null }),
      });
    });
  };

  resumeAudio = () => {
    if (this.props.audioContext.state === 'suspended') {
      return this.props.audioContext.resume();
    } else {
      return Promise.resolve();
    }
  };

  // Clear any residual notes that don't get called with stopNote
  stopAllNotes = () => {
    this.props.audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(this.state.activeAudioNodes);
      activeAudioNodes.forEach((node) => {
        if (node) {
          node.stop();
        }
      });
      this.setState({
        activeAudioNodes: {},
      });
    });
  };

  render() {
    return this.props.render
      ? this.props.render({
          isLoading: !this.state.instrument,
          playNote: this.playNote,
          stopNote: this.stopNote,
          stopAllNotes: this.stopAllNotes,
        })
      : null;
  }
}

export default LivePlayBack;
