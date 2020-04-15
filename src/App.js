import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import Visualization from './Visualization/Visualization.js'
import Toolbar from './Toolbar/Toolbar.js'

/* import {
  Switch,
  Paper, 
  Slide,
  FormControlLabel
  } from '@material-ui/core'; */

class App extends Component {
  constructor() {
    super()

    this.state = {
      instrument: "" // will be set by instrument selection component later
    }
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
        <Visualization />

        <Toolbar />
      </div>
    );
  }
}

export default App;
