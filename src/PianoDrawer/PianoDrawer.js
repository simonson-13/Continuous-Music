import React, { Component } from 'react';
import PianoApp from '../ophir_piano/PianoApp.js'
import {
    Drawer
} from '@material-ui/core';


export default class PianoDrawer extends Component {
    render() {
        return (
            <Drawer
                className="drawer"
                variant="persistent"
                anchor="top"
                open={this.props.showPiano}
            >
                <PianoApp
                    instrument={this.props.instrument}
                    showPiano={this.props.showPiano}
                />

            </Drawer>
        )
    }
}