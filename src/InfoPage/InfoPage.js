import React, {Component} from 'react';
import './InfoPage.css'

import {
    Modal
} from '@material-ui/core';

class InfoPage extends Component {
   // TODO: style this better

    render() {
        return (
            <div>
                <Modal 
                    open={this.props.open}
                    onClose={this.props.onClose}
                >
                    <div className="centered">
                        <p>
                            Welcome! This site is designed for you to interact musically with others. 
                            Feel free to play along with the other people online and record a snippet to
                            persist on the site (though it'll only last for ____, so keep recording and 
                            coming back for more)!
                        </p>
                        <p>
                            What you see in the background is a visualization of the sounds that you 
                            and everyone else here have made together. Through this, we hope you have 
                            some fun and feel less alone while making music! [more here]
                        </p>
                        <p>
                            <b>How to participate:</b> Open the toolbar below to get playing + recording! 
                                [more here on how recording works]
                        </p>
                        <p>
                            {/* TODO: smaller font here hehe, maybe include links to our personal githubs? */}
                            <b>Developers:</b> Priya Emani, Ophir Gal, Shannen Lam, Simon Liao, Shivam Patel <br/>   
                            Initially created for <i>ARTT489M/CMSC498N: Digital Media, Performance, and Interactivity</i> at the University of Maryland, College Park
                        </p> 
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InfoPage;