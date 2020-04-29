import React from 'react';

import {
    IconButton,
    Tooltip 
} from '@material-ui/core';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import Sketch from './sketch.js';
import DimensionsProvider from './DimensionsProvider';

import { makeStyles } from '@material-ui/core/styles';
import './Visualization.css';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        justifyContent:"center",
        height: "100vh",
        color: "white"
    },

    openDrop: {
        position: "absolute",
        left: "0",
        bottom: "0",
    },

    openButton: {
        background: "white"
    }
}));

export default function Visualization(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Tooltip title="Info" arrow> 
                <IconButton 
                    className={classes.openButton} 
                    type="button" 
                    onClick={props.openInfo}
                >
                    <HelpOutlineIcon />
                </IconButton>
            </Tooltip>

            <br/>
            <Tooltip title="Chat" arrow> 
                <IconButton 
                    className={classes.openButton} 
                    type="button" 
                    onClick={props.handleChatChange}
                >
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
            <DimensionsProvider>
                  {({ containerWidth, containerHeight}) => (
                      <Sketch 
                        width={containerWidth}
                        height={containerHeight}
                      />
                  )}
                </DimensionsProvider>
            

            <div className={classes.openDrop}> 
                <Tooltip title="Open Toolbar" arrow> 
                    <IconButton 
                        className={classes.openButton} 
                        onClick={props.handleBarChange}
                    > 
                        <KeyboardArrowUpIcon/>
                    </IconButton> 
                </Tooltip>
            </div>
        </div>
    );
}