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

            Visualization will go here!!
            todo: css to make this take up the whole page with icons on top of it

            {/* todo: css to put chat icon in top right corner */}
            <Tooltip title="Chat" arrow> 
                <IconButton type="button" onClick={props.handleChatChange}>
                    <QuestionAnswerIcon />
                </IconButton>
            </Tooltip>
            
            <div className={classes.openDrop}> 
                <Tooltip title="Open Toolbar" arrow> 
                    <IconButton className={classes.openButton} onClick={props.handleBarChange}> 
                        <KeyboardArrowUpIcon/>
                    </IconButton> 
                </Tooltip>
            </div>

            <Sketch />
            
        </div>
    );
}