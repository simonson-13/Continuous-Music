import React from 'react';

import {
    IconButton,
    Tooltip 
} from '@material-ui/core';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import Sketch from './sketch.js';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        justifyContent:"center",
        height: "100vh",
        background: "grey"
    },

    openDrop: {
        position: "absolute",
        left: "0",
        bottom: "0"
    },

    openButton: { 
        //backgroundColor: "white"
    }
}));

export default function Visualization(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Tooltip title="Info" arrow> 
                <IconButton type="button" onClick={props.openInfo}>
                    <HelpOutlineIcon />
                </IconButton>
            </Tooltip>

            Visualization will go here!! (in the bg where the gray is)

            <br/>
            <Tooltip title="Chat" arrow> 
                <IconButton type="button" onClick={props.handleChatChange}>
                    <QuestionAnswerIcon />
                </IconButton>
            </Tooltip>

            {/* TODO:
                p5.js Sketch as Background tutorial: 
                    https://www.youtube.com/watch?v=OIfEHD3KqCg

                    tl;dr -- give the canvas a style of z-index of -1 in setup():
                        canvas = createCanvas(windowWidth, windowHeight);
                        canvas.position(0, 0);
                        canvas.style('z-index', '-1');
                potentially helpful: 
                    https://stackoverflow.com/questions/54868777/how-to-use-react-with-p5-js
            */}

            <Sketch />

            <div className={classes.openDrop}> 
                <Tooltip title="Open Toolbar" arrow> 
                    <IconButton className={classes.openButton} onClick={props.handleBarChange}> 
                        <KeyboardArrowUpIcon/>
                    </IconButton> 
                </Tooltip>
            </div>
        </div>
    );
}