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

    /* componentDidMount() {
            const chatManager = new Chatkit.ChatManager({
                instanceLocator: instanceLocator,
                userId: 'janedoe',
                tokenProvider: new Chatkit.TokenProvider({
                    url: testToken
                })
            })
            
            chatManager.connect()
            .then(currentUser => {
                this.currentUser = currentUser
                this.currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
    
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
          })
        }
         
        sendMessage(text) {
            this.currentUser.sendMessage({
                text,
                roomId: roomId
            })
        }
        */

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