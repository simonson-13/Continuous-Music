import React, { Component } from 'react';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import InfoPage from './InfoPage/InfoPage.js'
import visualization from './Visualization/p5/sketch/sketch.js'
import Bar from './Bar/Bar.js'


class App extends Component {
  constructor() {
    super()

    this.state = {
      instrumentSeleted: false,
      instrument: "", 
      openInfo: false,
      showPiano: false
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

  handleClickPiano = () => { 
    this.setState({ 
      showPiano: !this.setState.showPiano
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

        <InfoPage open={this.state.openInfo} onOpen={this.handleOpenInfo} onClose={this.handleCloseInfo}/>

        <P5Wrapper sketch={visualization} color={this.state.color}> </P5Wrapper>

        { showPiano ? <Piano/> : null }

        <Bar handleShowPiano={this.handleShowPiano} />

      </div>
    );
  }
}

export default App;
