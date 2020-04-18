import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent:"center",
        height: "85vh",
        background: "grey"
    },
}));

export default function Visualization() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            Visualization will go here!!
            todo: css to make this take up the whole page with icons on top of it
            
        </div>
    );
}