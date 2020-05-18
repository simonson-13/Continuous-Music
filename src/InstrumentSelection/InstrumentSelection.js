import React, {Component} from 'react';
import '../App.css'

import {
    Button,
    Modal
} from '@material-ui/core';


class InstrumentSelection extends Component {
    render() {
        return (
            <div>
                <Modal 
                    open={this.props.open}
                >
                    <div className="centered">
                        <p>
                        Welcome! This site is all about playing music with others and seeing how
                        what you make together can unify into something beautiful. 
                        </p>
                        <p>
                        <i>Open the toolbar below</i> to get started playing + recording,
                        and <i>click on the info button</i> to learn more about what you can do here.
                        </p>
                        <b>But first, please choose an instrument:</b> <br/>
                        (This will be what you'll be playing in this "virtual band" experience.) <br/>
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