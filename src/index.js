import React from 'react';
import { render } from 'react-dom';
import './index.css';
import './index.html';
import Forecast from './forecast/forecast.jsx';


class App extends React.Component {
  render() {
    return <Forecast />;
  }
}

render(<App />, document.querySelector('#app'));