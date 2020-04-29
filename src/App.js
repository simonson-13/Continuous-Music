import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import InfoPage from './InfoPage/InfoPage.js'
import Visualization from './Visualization/Visualization.js'
import Bar from './Bar/Bar.js'
import PianoDrawer from './PianoDrawer/PianoDrawer.js'
import ChatDrawer from './ChatDrawer/ChatDrawer.js'


class App extends Component {
  constructor() {
    super()

    this.state = {
      instrumentSelected: false,
      instrument: "",
      showInfo: false,
      showPiano: false,
      showBar: false,
      showChat: false,
      usernameSet: false,
      username: "",
    }
  }

  handleInstrumentClick(instrument) {
    this.setState({
      instrumentSelected: true,
      instrument: instrument
    })
  }

  handleOpenInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  handleCloseInfo = () => {
    this.setState({
      showInfo: false
    })
  }

  handleClickPiano = () => {
    this.setState({
      showPiano: !this.state.showPiano
    })
  }

  handleBarChange = () => {
    this.setState({
      showBar: !this.state.showBar
    })
  }

  handleChatChange = () => {
    this.setState({
      showChat: !this.state.showChat
    })
  }

  handleCloseChat = () => {
    this.setState({
      showChat: false
    })
  }

  handleUsernameSubmit = (username) => {
    this.setState({
      username: username,
      usernameSet: true
    })
  }

  render() {
    return (
      <div className="App">

        <InstrumentSelection
          open={!this.state.instrumentSelected}
          onClick={instrument => this.handleInstrumentClick(instrument)}
        />

        <InfoPage
          open={this.state.showInfo}
          onOpen={this.handleOpenInfo}
          onClose={this.handleCloseInfo}
        />

        <Visualization
          openInfo={this.handleOpenInfo}
          handleBarChange={this.handleBarChange}
          handleChatChange={this.handleChatChange}
        />

        <ChatDrawer
          showChat={this.state.showChat}
          handleCloseChat={this.handleCloseChat}
          username={this.state.username}
          usernameSet={this.state.usernameSet}
          handleUsernameSubmit={this.handleUsernameSubmit}
        />

        <PianoDrawer
          instrument={this.state.instrument}
          //showPiano={this.state.showPiano}
          showPiano={this.state.showBar}
        />

        <Bar
          className="toolbar"
          handleClickPiano={this.handleClickPiano}
          showBar={this.state.showBar}
          handleBarChange={this.handleBarChange}
        />
      </div>
    );
  }
}

export default App;
