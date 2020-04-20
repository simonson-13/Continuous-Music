import React from 'react';

import {
    IconButton,
    Slide,
    AppBar,
    Toolbar,
    Button 
} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
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

    openDrop: { 
        paddingLeft: "30px"
    },

    closeDrop: { 
        marginTop: "-10vh",
        marginLeft: "-.5vw"
    },

    appBar: {
        top: 'auto',
        bottom: 0,
        height: "20vh",
        background: "white",
        color: "black"
      },

    toolbar: { 
        height: "20vh"
    }
}));

export default function Bar (props) {
    const classes = useStyles();
    const [hidden, setHidden] = React.useState(false);
    const [hasRecording, setHasRecording] = React.useState(false);


    const handleChange = () => {
        setHidden((prev) => !prev);
    };

    const handleDelete = () => { 
        setHasRecording((prev) => !prev);
        // if in the middle of recording, stop recording b4 delete

        // logic to delete local recording
    }

    const handleRecord = () => { 
        // logic to record 
        setHasRecording((prev) => !prev);

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
                <IconButton className={classes.openDrop} onClick={handleChange}> 
                    <KeyboardArrowUpIcon/>
                </IconButton> 
                    
                <Slide direction="up" in={hidden} mountOnEnter unmountOnExit>
                    {/* TODO: bar stuff goes here */}
                    <AppBar className={classes.appBar} position="fixed" > 
                        <Toolbar className={classes.toolbar}> 
                            <IconButton className={classes.closeDrop} onClick={handleChange}> 
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                            
                            <Button  
                                variant="contained"
                                startIcon={<DeleteIcon/>}
                                size="large"
                                onClick={handleDelete}
                                disabled={!hasRecording}> 
                                Delete
                                Recording
                            </Button>

                            <Button  
                                variant="contained"
                                startIcon={<MicIcon/>}
                                size="large"
                                onClick={handleRecord}
                                disabled={hasRecording}> 
                                Record
                            </Button>

                            <Button  
                                variant="contained"
                                startIcon={<PlayArrowIcon/>}
                                size="large"
                                onClick={playRecording}
                                disabled={!hasRecording}> 
                                Listen
                            </Button>
                            

                            {/* TODO: have text be like.. hover text
                                and style this LOL. 
                                
                            */}

                            some kinda progress bar for recording

                            <Button  
                                variant="contained"
                                startIcon={<SendIcon/>}
                                size="large"
                                onClick={handleUpload}
                                disabled={!hasRecording}> 
                                Upload
                            </Button>

                            <Button  
                                variant="contained"
                                startIcon={<GetAppIcon/>}
                                size="large"
                                onClick={handleDownload}
                                disabled={!hasRecording}> 
                                Download
                            </Button>

                            <Button  
                                variant="contained"
                                startIcon={<StraightenIcon/>}
                                size="large"
                                onClick={props.handleClickPiano}> 
                                Toggle Piano
                            </Button>

                        </Toolbar>
                    </AppBar>
                </Slide>
            </div>
        </div>
    );
}