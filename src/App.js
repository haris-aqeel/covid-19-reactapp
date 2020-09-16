import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Header from './components/Header'
import Search from './components/Search'



function App() {
  return (
    <div className="App">
        <Navbar />
        <Header/>
        <Search />
    </div>
  );
}

export default App;
