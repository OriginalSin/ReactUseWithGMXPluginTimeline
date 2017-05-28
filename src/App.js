import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map Leaflet={this.props.Leaflet} />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default App;
