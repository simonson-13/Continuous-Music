import React, { Component } from 'react';
import '../App.css'
import PianoApp from '../Piano/PianoApp.js'
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
                    userID={this.props.userID}
                    isRecording={this.props.isRecording}
                    startTime={this.props.startTime}
                    tempStrFun={this.props.tempStrFun}
                    userRef={this.props.userRef}
                />
            </Drawer>
        )
    }
}
