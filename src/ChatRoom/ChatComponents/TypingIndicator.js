import React, { Component } from 'react';
import '../ChatRoom.css'

export default class TypingIndicator extends Component {
	render() {
		let typersDisplay = '';
        let countTypers = 0;
        
		/* for each user writing messages in chatroom */
		for ( var key of this.props.isTyping ) {
			/* retrieve the name if it isn't the owner of the chatbox */
			if( key !== this.props.owner && this.props.isTyping[key] ) {
				typersDisplay += ', ' + key;
				countTypers++;
			}
        }
        
		/* formatting text */
		typersDisplay = typersDisplay.substr(1);
        typersDisplay += (( countTypers > 1 ) ? ' are ' : ' is ');
        
		/* if at least one other person writes */
		if ( countTypers > 0 ) {
			return (
				<div className={"chatApp__convTyping"}>{typersDisplay} writing
				<span className={"chatApp__convTypingDot"}></span>
				</div>
			);
        }
        
		return (
			<div className={"chatApp__convTyping"}></div>
		);
	}
}