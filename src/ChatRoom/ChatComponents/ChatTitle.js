import React, { Component } from 'react';
import '../ChatRoom.css';

export default class ChatTitle extends Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div 
				className={"chatApp__convTitle"}
			>
				Chat
			</div>
		);
	}
}