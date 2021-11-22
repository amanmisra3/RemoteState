import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar';
import Display from './components/Display/Display';

function App() {

  const [truckStatusText, setTruckStatusText] = useState('')

  const getTruckStatus = (truckStatusText) => {
    setTruckStatusText(truckStatusText)
  }

  return (
    <div>
      <Navbar getTruckStatus={getTruckStatus}></Navbar>
      <Display truckStatusText={truckStatusText} />
    </div>
  );
}

export default App;
