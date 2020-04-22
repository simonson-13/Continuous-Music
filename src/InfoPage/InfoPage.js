import React, {Component} from 'react';
import './InfoPage.css'

import {
    Modal
} from '@material-ui/core';

class InfoPage extends Component {

   // TODO: style this better, move styling into same file

    render() {
        return (
            <div>
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