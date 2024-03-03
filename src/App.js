import React, { Component } from 'react';

import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/noteState'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="container">
          <Routes>
             <Route exact path="/about" element={<About/>}/>
             <Route exact path='/' element={ <Home/>}/>      
          </Routes>
          </div>
        </Router>
      </NoteState>
      </>
    );
  }
}

export default App;
