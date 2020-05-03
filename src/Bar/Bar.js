import React from 'react';

import {
    IconButton,
    Slide,
    AppBar,
    Toolbar,
    Button,
    Tooltip
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import DeleteIcon from '@material-ui/icons/Delete';
import MicIcon from '@material-ui/icons/Mic';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SendIcon from '@material-ui/icons/Send';
import StraightenIcon from '@material-ui/icons/Straighten';
import GetAppIcon from '@material-ui/icons/GetApp';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent:"center"
    },
    wrapper: {
        //width: 100 + theme.spacing(2),
    },

    closeDrop: {
       // marginTop: "-10vh",
        marginLeft: "-.5vw"
    },

    appBar: {
        top: 'auto',
        bottom: 0,
        //height: "20vh",
        background: "white",
        color: "black"
    },

    centerButtons: {
        marginLeft: "auto",
        marginRight: "auto"
    },

    button: {
        margin: "0px 25px",
    }
}));

export default function Bar (props) {
    const classes = useStyles();
    const [hasRecording, setHasRecording] = React.useState(false);
    var isRecording = false;
    var recording = "";

    const handleDelete = () => {
        setHasRecording((prev) => !prev);
        // if in the middle of recording, stop recording b4 delete

        // logic to delete local recording
        isRecording = false;
        props.tempStrFun(-1); //resets the recording variable back in app.js to be empty
        recording = "";
    }

    const handleRecordHelper = () => {
      isRecording = !isRecording;
      props.isRecordingFun(isRecording);

      if(!isRecording){
        recording = props.tempStrFun(-2);
        props.tempStrFun(-1);
        console.log(recording);
      }
    }

    const handleRecord = () => {
        // logic to record
        setHasRecording((prev) => !prev);

        handleRecordHelper();
        setTimeout(handleRecordHelper, 3000); //3 seconds to record

    }

    const playRecording = () => {

        // logic to listen to recording
        // make sure people cant play the recording while ur still recording it
    }

    const handleUpload = () => {

        // logic to listen to recording
        // make sure people cant play the recording while ur still recording it
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

                                some kinda progress bar for recording

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

                                {/* <Tooltip title="Toggle Piano" arrow>
                                    <span className={classes.button}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={props.handleClickPiano}
                                    >
                                        <StraightenIcon/>
                                    </Button>
                                    </span>
                                </Tooltip> */}
                            </div>

                        </Toolbar>
                    </AppBar>
                </Slide>
            </div>
        </div>
    );
}
