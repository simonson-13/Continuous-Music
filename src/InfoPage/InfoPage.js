import React, {Component} from 'react';
import './InfoPage.css'

import {
    IconButton,
    Modal
} from '@material-ui/core';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


class InfoPage extends Component {

   // TODO: style this better, move styling into same file

    render() {
        return (
            <div>
                <IconButton type="button" onClick={this.props.onOpen}>
                    <HelpOutlineIcon />
                </IconButton>
                <Modal 
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <div className="centered">
                        info about this project!!

                        credits to us at bottom hehe
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InfoPage;