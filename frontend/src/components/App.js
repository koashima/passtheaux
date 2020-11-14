import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return (
    <h1>PASSTHEAUX</h1>
  )
}

export default App;

const appDiv = document.getElementById("app");

render(<App />, appDiv);