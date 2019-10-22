import React from "react";
import logo from "./logo.svg";
import Restaurant from "./components/restaurants";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Projet Restaurant - Kevin Aubriet</p>
        <Restaurant></Restaurant>
      </header>
    </div>
  );
}

export default App;
