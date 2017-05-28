import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'antd/dist/antd.min.css';
import './Map.css';

var leaflet = window.L;
ReactDOM.render(<App Leaflet={leaflet} />, document.getElementById('root'));
registerServiceWorker();
