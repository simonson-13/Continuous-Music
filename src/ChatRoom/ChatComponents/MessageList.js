import React, { Component } from 'react';
import '../ChatRoom.css';
import MessageItem from './MessageItem.js';

export default class MessageList extends Component {
	constructor(props, context) {
		super(props, context);
    }
    
	render() {
		return (
			<div className={"chatApp__convTimeline"}>
			{this.props.messages.slice(0).reverse().map(
				messageItem => (
					<MessageItem
						key={messageItem.id}
						owner={this.props.owner}
						sender={messageItem.sender}
						senderAvatar={messageItem.senderAvatar}
						message={messageItem.sender + ":<br>" +
								 messageItem.message}
					/>
				)
			)}
			</div>
		);
	}
}