import React, { Component } from 'react';
import '../ChatRoom.css'

export default class ChatInputMessage extends Component {
	constructor(props, context) {
        super(props, context);
        
		this.handleSendMessage = this.handleSendMessage.bind(this);
    }
    
	handleSendMessage(event) {
		event.preventDefault();
		/* Disable sendMessage if the message is empty */
		if( this.messageInput.value.length > 0 ) {
			this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
			/* Reset input after send*/
			this.messageInput.value = '';
		}
    }
    
	render() {
		/* If the chatbox state is loading, loading class for display */
		var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
		let sendButtonIcon = <i className={"material-icons"}>send</i>;
		return (
			<form onSubmit={this.handleSendMessage}>
				<input
					type="hidden"
					ref={owner => (this.ownerInput = owner)}
					value={this.props.owner}
				/>
				<input
					type="hidden"
					ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
					value={this.props.ownerAvatar}
				/>
				<input
					type="text"
					ref={message => (this.messageInput = message)}
					className={"chatApp__convInput"}
					placeholder="Text message"
					tabIndex="0"
				/>
                <div 
                    className={'chatApp__convButton ' + loadingClass} 
                    onClick={this.handleSendMessage}
                >
				    {sendButtonIcon}
				</div>
			</form>
		);
	}
}