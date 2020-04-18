import React, { Component } from 'react';
import './App.css';

import InstrumentSelection from './InstrumentSelection/InstrumentSelection.js'
import Visualization from './Visualization/Visualization.js'
import Toolbar from './Toolbar/Toolbar.js'
//import p5 from 'p5'

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
    // this.renderRef = React.createRef()
    // this.sketch= new p5( p => {      
    //   p.setup = () => {
    //     p.createCanvas(200,200)
    //     .parent(this.renderRef.current)
    //   }

    //   p.draw = () => {
    //     p.background(0)
    //     p.fill(255)
    //     p.rect(100, 100, 50, 50)
    //   }
    // })
    return (
      <div className="App">
        <Visualization />

        <Toolbar />
      </div>
    );
  }
}

export default App;
