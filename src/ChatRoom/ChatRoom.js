import React from 'react';
import './ChatRoom.css';
import firebase from 'firebase';

import ChatBox from './ChatComponents/ChatBox.js'

/* detect url in a message and add a link tag */
function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}

export default class ChatRoom extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [],
			isTyping: []
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
		this.username = this.props.username
	}

	componentDidMount() {
		this.dbRef = firebase.database().ref();
		this.msgsRef = this.dbRef.child('chat').child('messages');
		this.isTypingRef = this.dbRef.child('chat').child('isTyping');

		// get 'messages' and 'isTyping' lists from firebase
		this.msgsRef.on('value', snap => {
			let messageList = snap.val();
			this.setState({
				messages: messageList
			})
		});

		// get 'messages' and 'isTyping' lists from firebase
		this.isTypingRef.on('value', snap => {
			let isTypingList = snap.val();

			/*this.setState({]
			  isTyping: 
			})*/
		});
	}

	/* adds a new message to the chatroom */
	sendMessage(sender, senderAvatar, message) {
		setTimeout(() => {
			let messageFormat = detectURL(message);
			let newMessageItem = {
				id: this.state.messages.length + 1,
				sender: sender,
				senderAvatar: senderAvatar,
				message: messageFormat
			};
			this.msgsRef.child(this.state.messages.length).set(newMessageItem);
			this.resetTyping(sender);
		}, 400);
	}

	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if (!this.state.isTyping[writer]) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}

	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
	}

	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let isTyping = this.state.isTyping;
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;

		/* user details - can add as many users as desired */
		users[0] = {
			name: this.props.username,
			avatar: 'https://api.adorable.io/avatars/285/' + this.props.username + '.png'
		};

		/* creation of a chatbox for each user present in the chatroom */
		Object.keys(users).map(function (key) {
			var user = users[key];
			chatBoxes.push(
				<ChatBox className="Form"
					key={key}
					owner={user.name}
					ownerAvatar={user.avatar}
					sendMessage={sendMessage}
					typing={typing}
					resetTyping={resetTyping}
					messages={messages}
					isTyping={isTyping}
				/>
			);
		});
		return (
			<div className="chatApp__room">
				{chatBoxes}
			</div>
		);
	}
}
