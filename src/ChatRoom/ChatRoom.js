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
			messages: []
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.username = this.props.username
	}

	componentDidMount() {
		this.dbRef = firebase.database().ref();
		this.msgsRef = this.dbRef.child('chat').child('messages');

		// get 'messages' list from firebase
		this.msgsRef.on('value', snap => {
			let messageList = snap.val();
			this.setState({
				messages: messageList
			})
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
		}, 400);
	}

	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let sendMessage = this.sendMessage;

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
					messages={messages}
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
