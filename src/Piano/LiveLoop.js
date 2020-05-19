import React from 'react';
import Soundfont from 'soundfont-player';
import * as firebase from 'firebase';  // importing firebase!!!

class LiveLoop extends React.Component {
    constructor(props) {
      super(props);
      this.dbRef = firebase.database().ref();
      this.playbackRef = this.dbRef.child('live').child('playback');
      this.recsRef = this.dbRef.child('recs');
    }

    _convertStringRecToArray = (r) => {
        let melody = [];
        let rec = r.split("\n").map(line => line.split(","));
        for (let note of rec){
            melody.push({time: parseFloat(note[0])/1000,
                         note: parseInt(note[1]),
                         duration: parseFloat(note[2])/1000});
        }
        return melody;
    }
    
    playRecording = (rec, instrument) => {
        var props = this.props;
        var _convertStringRecToArray = this._convertStringRecToArray;
        // The first step is always create an instrument:
        Soundfont.instrument(props.audioContext, instrument)
        .then(function (instrument) {
            // Or schedule events at a given time
            instrument.schedule(props.audioContext.currentTime,
                                _convertStringRecToArray(rec));
        })
    }
  
    componentDidMount() {
        // Play all recordings in DB when playback is triggered
        // AND given the mute button is not pressed
        var isMutePressed = this.props.isMutePressed;
        this.playbackRef.on('value', snap => {
                if (snap.val() === 'true' && (!isMutePressed)){
                    this.recsRef.once('value', snap => {
                        let recsDict = snap.val();
                        for (let key in recsDict){
                            let inst_and_rec = recsDict[key]
                            let inst = inst_and_rec.split("\n")[0]
                            let rec = inst_and_rec.substr(inst.length)
                            this.playRecording(rec, inst)
                        }
                    })
                }
        })
    }

    render() {
      return (null);
    }
  }
  
  export default LiveLoop;