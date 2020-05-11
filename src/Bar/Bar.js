import React from 'react';
import ProgressBarContainer from '../ProgressBar/ProgressBarContainer'

import {
    IconButton,
    Slide,
    AppBar,
    Toolbar,
    Button,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SendIcon from '@material-ui/icons/Send';
import GetAppIcon from '@material-ui/icons/GetApp';
import Soundfont from 'soundfont-player'

import * as firebase from 'firebase'; // import firebase!

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent:"center",
        width: "100%"
    },
    wrapper: {
        //width: 100 + theme.spacing(2),
        width: "100%"
    },

    closeDrop: {
        marginLeft: "-.5vw"
    },

    appBar: {
        top: 'auto',
        bottom: 0,
        background: "white",
        color: "black"
    },

    centerButtons: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "100%"
    },

    button: {
        margin: "0px 25px",
        display: "inline-block",
        verticalAlign: "middle"
    }
}));

export default function Bar (props) {
    const classes = useStyles();
    const [hasRecording, setHasRecording] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);
    var isRecordingFlag = false;
    var recording = "";
    var counter = 0;
    var uploaded = false;

    const handleDelete = () => {
        setHasRecording((prev) => !prev);
        // if in the middle of recording, stop recording b4 delete

        // logic to delete local recording
        setIsRecording(false);
        isRecordingFlag = false;
        props.tempStrFun(-1); //resets the recording variable back in app.js to be empty
        Bar.recording = "";
        uploaded = false;
    }

    const handleRecordHelper = () => {
      setIsRecording((prev) => !prev);
      isRecordingFlag = !isRecordingFlag;
      props.isRecordingFun(isRecordingFlag);

      if(!isRecordingFlag){
        Bar.recording = props.tempStrFun(-2);
        props.tempStrFun(-1);
      }
    }

    const handleRecord = () => {
        // logic to record
        setHasRecording((prev) => !prev);

        handleRecordHelper();
        setTimeout(handleRecordHelper, 4000); //4 seconds to record
    }

    const _convertStringRecToArray = (r) => {
        let melody = [];
        let rec = r.split("\n").map(line => line.split(","));
        for (let note of rec){
            melody.push({time: parseFloat(note[0])/1000,
                         note: parseInt(note[1]),
                         duration: parseFloat(note[2])/1000});
        }
        return melody;
    }

    const playRecording = () => {
        // logic to listen to recording
        // make sure people cant play the recording while ur still recording it
        if (!isRecordingFlag) {
            // The first step is always create an instrument:
            Soundfont.instrument(props.audioContext, props.instrument)
            .then(function (instrument) {
                // Or schedule events at a given time
                instrument.schedule(props.audioContext.currentTime,
                                    _convertStringRecToArray(Bar.recording));
            })
        }
    }

    const removeUpload = (ref) => {
      ref.remove();
    }

    const handleUpload = () => {
        // logic to listen to handle upload click
        // make sure people cant upload an empty recording
        if (Bar.recording !== "" && !uploaded){

          //counting current number of children the ghetto way because numChildren is not working
          firebase.database().ref("recs").once("value").then(function(snapshot){

            var max = -1;
            var min = 100000000;
            var numRecs = 0;
            snapshot.forEach(function(childSnapshot){
              //increment recs
              numRecs++;

              var currKey = parseInt(childSnapshot.key);
              //check min
              if(currKey < min) {
                min = currKey;
              }
              //check max
              if(currKey > max) {
                max = currKey;
              }
            });

            //what to do if there are already 10 recordings
            if(numRecs >= 10){
              //delete oldest
              removeUpload(firebase.database().ref("recs").child(min));
            }

            //add new recording
            var newKey = max + 1;
            var newRecRef = firebase.database().ref("recs").child(newKey);
            newRecRef.set(props.instrument + "\n" + Bar.recording);
            uploaded = true;

            //8 seconds until auto removed
            setTimeout(function(){ removeUpload(newRecRef);}, 8000);
          });

          //upload to user's database ref (ALL RECORDINGS)

          // var tempRef = firebase.database().ref("recs").push();
          // tempRef.set(Bar.recording);
          // uploaded = true;

          //playback for 10 seconds on database before removal
          // setTimeout(function(){ removeUpload(tempRef);}, 10000);
        }
    }

    const handleDownload = () => {
        // logic to download your recording
    }


    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Slide direction="up" in={props.showBar} mountOnEnter unmountOnExit>
                    <AppBar className={classes.appBar} position="fixed" >
                        <Toolbar className={classes.toolbar}>
                            <Tooltip title="Close Toolbar" arrow>
                                <IconButton edge="start" className={classes.closeDrop} onClick={props.handleBarChange}>
                                    <KeyboardArrowDownIcon/>
                                </IconButton>
                            </Tooltip>

                            <div className={classes.centerButtons}>
                                <Tooltip title="Delete Recording" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleDelete}
                                        disabled={!hasRecording}
                                    >
                                        <DeleteIcon/>
                                    </Button>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Record" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleRecord}
                                        disabled={hasRecording}
                                    >
                                        <MicIcon/>
                                    </Button>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Listen" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={playRecording}
                                        disabled={!hasRecording}
                                    >
                                        <PlayArrowIcon/>
                                    </Button>
                                    </span>
                                </Tooltip>

                                {/* TODO: make button styling and hovertext better */}

                                <ProgressBarContainer isRecording={isRecording}/>

                                <Tooltip title="Upload" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleUpload}
                                        disabled={!hasRecording}
                                    >
                                        <SendIcon/>
                                    </Button>
                                    </span>
                                </Tooltip>

                                <Tooltip title="Download" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleDownload}
                                        disabled={!hasRecording}
                                    >
                                        <GetAppIcon/>
                                    </Button>
                                    </span>
                                </Tooltip>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Slide>
            </div>
        </div>
    );
}
