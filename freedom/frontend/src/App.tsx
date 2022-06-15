import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function App() {
  const buttonAlert = () => {
    axios.get('/api-test').then((res)=>{
      console.log(res)
    }).catch(error=>{
      console.log(error);
    });
    alert('Clicked!');
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={buttonAlert}>Click me</button>
      </header>
    </div>
  );
}

export default App;
