import React, { Component } from 'react';
import './Chat.css'

import UsernameModal from './UsernameModal.js'
import ChatForm from './ChatForm.js';

import {
    Drawer,
} from '@material-ui/core'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
        }
    }

    render() {
        return (
            <div className="chat">
                <Drawer
                    className="drawer"
                    variant="persistent"
                    anchor="right"
                    open={this.props.showChat}
                >
                    <UsernameModal
                        open={!this.props.usernameSet && this.props.showChat}
                        handleChange={username => this.props.handleUsernameSubmit(username)}
                    />

                    <div className="app__list">
                        <ChatForm username={this.props.username} />
                    </div>

                </Drawer>
            </div>
        );
    }
}

export default Chat