
import React from 'react';
import './App.css';
import MinesContainer from './containers/mines-container';

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <MinesContainer dimentions={16} minesTotal={40}/>
      </React.StrictMode>
    </div>
  );
}

export default App;
