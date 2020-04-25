import React, { Component } from 'react';
import '../ChatRoom.css';

export default class MessageItem extends Component {
	render() {
		/* message position formatting - right if I'm the author */
		let messagePosition = (( this.props.owner == this.props.sender ) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left');
		return (
            <div 
                className={"chatApp__convMessageItem " + messagePosition + " clearfix"}
            >
                <img 
                    src={this.props.senderAvatar} 
                    alt={this.props.sender} 
                    className="chatApp__convMessageAvatar" 
                />

                <div 
                    className="chatApp__convMessageValue" 
                    dangerouslySetInnerHTML={{__html: this.props.message}}
                >
                </div>
			</div>
		);
	}
}