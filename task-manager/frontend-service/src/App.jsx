import { useState } from 'react';


import './App.css'

function App() {
  async function fetchTasks() {
    try {
      const response = await fetch('http://localhost:4001/task');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <div>
      <p>This project is presented by Ayoub and Chaima </p>
    </div>
  )
}

export default App;
