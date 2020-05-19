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

    render() {
      return (null);
    }
  }
  
  export default LiveLoop;