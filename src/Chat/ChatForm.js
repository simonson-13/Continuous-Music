import React, { Component } from 'react';
import './ChatForm.css';
import Message from './Message';

import firebase from 'firebase';

// https://medium.com/@Chilid/react-firebase-chat-app-a115653b7477

// maybe look into this: https://css-tricks.com/building-a-real-time-chat-app-with-react-and-firebase/

export default class ChatForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.username,
            message: '',
            list: [],
        };

        // Commented out for the sake of compilation
        /* this.messageRef = firebase.database().ref().child('messages');
        this.listenMessages(); */
    }

    handleChange(event) {
        this.setState({
            message: event.target.value
        });
    }

    handleSend() {
        if (this.state.message) {
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
            }
            this.messageRef.push(newItem);
            this.setState({ message: '' });
        }
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSend();
        }
    }

    // Commented out for the sake of compilation
    /* listenMessages() {
        this.messageRef
            .limitToLast(10)
            .on('value', message => {
                this.setState({
                    list: Object.values(message.val()),
                });
            });
    } */

    render() {
        return (
            <div className="form">
                <div className="form__message">
                    {this.state.list.map((item, index) =>
                        <Message key={index} message={item} />
                    )}
                </div>
                <div className="form__row">
                    <input
                        className="form__input"
                        type="text"
                        placeholder="Type message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form__button"
                        onClick={this.handleSend.bind(this)}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}