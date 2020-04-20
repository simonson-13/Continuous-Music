import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import InfoPage from './InfoPage/InfoPage.js'
import Visualization from './Visualization/Visualization.js'
import Bar from './Bar/Bar.js'
import PianoApp from './ophir_piano/PianoApp.js'


class App extends Component {
  constructor() {
    super()

    this.state = {
      instrumentSeleted: false,
      instrument: "", 
      openInfo: false
    }
  }

  handleInstrumentClick(instrument) { 
    this.setState({
      instrumentSeleted: true,
      instrument: instrument
    })
  }

  handleOpenInfo = () => { 
    this.setState({ 
      openInfo: true
    })
  }

  handleCloseInfo = () => { 
    this.setState({ 
      openInfo: false
    })
  }

  /*
    TODO: keyboard bindings 
    A-L (or so) = musical sounds
    R = rerecord?
    space = record
    i = opens up 'info page' (along with mouse click) 
    **potential for other keyboard bindings!
  */
  
  render() {
    return (
      <div className="App">

        <InstrumentSelection open={!this.state.instrumentSeleted} onClick={instrument => this.handleInstrumentClick(instrument)} />

        <InfoPage open={this.state.openInfo} onOpen={this.handleOpenInfo} onClose={this.handleCloseInfo} />

        <Visualization />
        
        <PianoApp />

        <Bar />
      </div>
    );
  }
}

export default App;
