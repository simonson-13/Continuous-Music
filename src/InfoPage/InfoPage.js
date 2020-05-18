import React, {Component} from 'react';
import '../App.css'
import {
    Modal
} from '@material-ui/core';

class InfoPage extends Component {
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
                            Feel free to play along with the other people online and record a snippet 
                            to temporarily persist on the site. Since all recordings are temporary, 
                            feel free to keep recording and coming back for more! Each experience 
                            on this site is different from the rest.
                        </p>
                        <p>
                            What you see in the background is a visualization of the sounds that you 
                            and everyone else here have made together. Through this, we hope you have 
                            some fun and feel less alone while making music.
                        </p>
                        <p>
                            <b><u>How to participate:</u> </b>
                                Open the <b>toolbar</b> in the lower left-hand corner to get playing + recording! 
                                Once you press the <b>'Record' button</b>, you will have four seconds to press your 
                                keyboard keys and create an audio snippet that you can then post to the site by 
                                pressing the <b>'send' button</b>. Press the <b>'play' button</b> to playback your
                                recording. Not satisfied with it? Delete and re-record as many times as you want! 
                                Press <b>'mute'</b> to stop all the background noise (other users).
                        </p>
                        <p style={{fontSize: "10pt"}}>
                            <b>Developers:</b> <a href="https://github.com/pemani98">Priya Emani</a>, 
                                                <a href="https://github.com/Ophir-Gal"> Ophir Gal</a>, 
                                                <a href="https://github.com/shannenlm"> Shannen Lam</a>, 
                                                <a href="https://github.com/simonson-13"> Simon Liao</a>, 
                                                <a href="https://github.com/shivampatel623"> Shivam Patel</a><br/>   
                            Initially created for <i>ARTT489M/CMSC498N: Digital Media, Performance, and Interactivity</i> at the University of Maryland, College Park
                        </p> 
                    </div>
                </Modal>
            </div>
        )
    }
}

export default InfoPage;