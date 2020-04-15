import React from 'react';

import {
    Switch,
    Slide,
    FormControlLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // TODO: add style to pin this toolbar to the bottom
    // like 20% of the screen
    root: {
        height: 180, 
    },
    wrapper: {
        width: 100 + theme.spacing(2),
    },
}));

export default function Toolbar() {
    const classes = useStyles();
    const [hidden, setHidden] = React.useState(false);

    const handleChange = () => {
        setHidden((prev) => !prev);
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {/* TODO: change Switch to a v and ^ button thing*/}
                <FormControlLabel
                    control={<Switch checked={hidden} onChange={handleChange} />}
                    label="Show"
                />
                <Slide direction="up" in={hidden} mountOnEnter unmountOnExit>
                    {/* TODO: bar stuff goes here */}
                    <p>hello. this is a placeholder</p>
                </Slide>
            </div>
        </div>
    );
}