import React, {Component} from 'react';
import './Chat.css'

import {
    TextField,
    FormControl,
    Modal
} from '@material-ui/core';


class UsernameModal extends Component {
    constructor(props) { 
        super(props)
        this.state = { 
            error: false
        }
    }
   // TODO: style this better, move styling into same file

    render() {

        return (
            <div>
                <Modal 
                    open={this.props.open}
                    //onClose={this.props.onClose}
                >
                    <div className="centered">
                        Please enter a username for yourself! (Press Enter to submit) <br/>
                        <FormControl>
                            <TextField 
                                required 
                                label="Username"
                                //variant="outlined"
                                error = {this.state.error}
                                helperText={this.state.error ? "Username cannot be empty.":null}
                                onKeyPress={(e) => {
                                    if (e.target.value === "") { 
                                        this.setState( { 
                                            error: true
                                        })
                                    }
                                    else if (e.key === 'Enter') {
                                        this.props.handleChange(e.target.value)
                                    }
                                    else { 
                                        this.setState( { 
                                            error: false
                                        })
                                    }
                                  }}
                            />
                        </FormControl>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default UsernameModal;