import React, { Component } from 'react';
import './Chat.css'

import UsernameModal from './UsernameModal.js'
import MessageList from './MessageList.js'
import SendMessageForm from './SendMessageForm.js'



/** Replace these with your own API keys, username and roomId from Chatkit  */
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/dfaf1e22-2d33-45c9-b4f8-31f634621d24/token"
const instanceLocator = "v1:us1:dfaf1e22-2d33-45c9-b4f8-31f634621d24"
const roomId = 9806194
const username = 'perborgen'

class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [],
        }
        this.sendMessage = this.sendMessage.bind(this)
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
     */
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        })
    }
    
    render() {
        return (
            <div className="app">
                <UsernameModal 
                    open={!this.props.usernameSet} 
                    handleChange={username => this.props.handleUsernameSubmit(username)} 
                />
                
              <MessageList 
                  roomId={this.state.roomId}
                  messages={this.state.messages} />
              <SendMessageForm
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default Chat