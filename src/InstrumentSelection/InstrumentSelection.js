import React, {Component} from 'react';
import './InstrumentSelection.css'

import {
    Button,
    Modal
} from '@material-ui/core';


class InstrumentSelection extends Component {
   // TODO: style this better, move styling into same file

    render() {
        return (
            <div>
                <Modal 
                    open={this.props.open}
                >
                    <div className="centered">
                        Please choose an instrument! <br/>
                        <Button 
                            onClick={() => this.props.onClick("acoustic_grand_piano")}
                        >
                            Piano
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("cello")}
                        >
                            Cello
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("acoustic_guitar_nylon")}
                        >
                            Guitar
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("trumpet")}
                        >
                            Trumpet
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("xylophone")}
                        >
                            Xylophone
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InstrumentSelection;