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
                            onClick={() => this.props.onClick("drum")}
                        >
                            Drum
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("piano")}
                        >
                            Piano
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("guitar")}
                        >
                            Guitar
                        </Button>
                        <Button 
                            onClick={() => this.props.onClick("trumpet")}
                        >
                            Trumpet
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InstrumentSelection;