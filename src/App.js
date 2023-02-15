import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import ToDo from './components/list';

function App() {

  return (
    <div className='principal'>
      <ToDo />
    </div>
  );
}

export default App;
