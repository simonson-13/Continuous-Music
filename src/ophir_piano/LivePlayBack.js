// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from 'react';
import PropTypes from 'prop-types';
import Soundfont from 'soundfont-player';
import * as firebase from 'firebase'; // import firebase!

const shortToProperName = {
                            'piano':'acoustic_grand_piano',
                            'cello':'cello',
                            'guitar':'acoustic_guitar_nylon',
                            'trumpet':'trumpet',
                            'xylophone':'xylophone'
                          };

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
    this.dbRef = firebase.database().ref();
    this.dbPianoRef = this.dbRef.child('live').child(this.props.instrumentName);
  }

  componentDidMount() {
    this.loadInstrument(shortToProperName[this.props.instrumentName]);
    this.dbPianoRef.on('value', snap => {
      console.log('DB changed');
      let liveNotesDB = snap.val();
      for (let note=0; note < liveNotesDB.length; note++){
        if (liveNotesDB[note] > 0) { // TODO: add check that only plays if note not already playing
          this.playNote(note);
        } else {
          this.stopNote(note);
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
    this.resumeAudio().then(() => {
      const audioNode = this.state.instrument.play(midiNumber);
      this.setState({
        activeAudioNodes: Object.assign({}, this.state.activeAudioNodes, {
          [midiNumber]: audioNode,
        }),
      });
    });
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
