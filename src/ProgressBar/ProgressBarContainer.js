import React from 'react'
import ProgressBar from './ProgressBar'
import './ProgressBar.css'

export default class ProgressBarContainer extends React.Component { 
    render() { 
        return (
            <div id="myProgress">
                { this.props.useProgressBar ? <ProgressBar/> : null }
            </div>
        )
    }
}
