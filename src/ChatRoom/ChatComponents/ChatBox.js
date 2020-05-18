import React, { Component } from 'react';
import '../ChatRoom.css';

import ChatTitle from './ChatTitle.js';
import MessageList from './MessageList.js';
import ChatInputMessage from './ChatInputMessage.js'

export default class ChatBox extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false
		};
		this.sendMessageLoading = this.sendMessageLoading.bind(this);
	}

	/* catch the sendMessage signal and update the loading state then continues the sending instruction */
	sendMessageLoading(sender, senderAvatar, message) {
		this.setState({ isLoading: true });
		this.props.sendMessage(sender, senderAvatar, message);
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 400);
	}
	
	render() {
		return (
			<div className={"chatApp__conv"}>
				<ChatTitle
					owner={this.props.owner}
				/>
				<MessageList
					owner={this.props.owner}
					messages={this.props.messages}
				/>
				<div className={"chatApp__convSendMessage clearfix"}>
					<ChatInputMessage
						isLoading={this.state.isLoading}
						owner={this.props.owner}
						ownerAvatar={this.props.ownerAvatar}
						sendMessage={this.props.sendMessage}
						sendMessageLoading={this.sendMessageLoading}
					/>
				</div>
			</div>
		);
	}
}