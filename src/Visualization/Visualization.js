import React from 'react';
import p5 from 'p5'
/* import {
    Switch,
    Slide,
    FormControlLabel
} from '@material-ui/core';
*/

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 180, // set to be like 80%-ish of screen
    },
}));

export default function Visualization() {
    const classes = useStyles();
    //const [hidden, setHidden] = React.useState(false);

    /*const handleChange = () => {
        setHidden((prev) => !prev);
    };
    */

    return (
        <div className={classes.root}>
          vis   
        </div>
    );
}