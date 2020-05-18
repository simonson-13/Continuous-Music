import React, { Component } from 'react';
import UsernameModal from './UsernameModal.js'
import ChatRoom from '../ChatRoom/ChatRoom.js'

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

                    <div className="app__list chat">
                        <ChatRoom username={this.props.username} />
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default Chat;