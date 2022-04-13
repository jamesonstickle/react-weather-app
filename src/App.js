import React from "react";
import "./App.css";
import Forecast from "./components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="Face.png" alt="jams face" class="max-w-min h-auto rounded-full"></img>
        <h1>Jameson's Weather App</h1>
      </header>
      <main>
        <Forecast />
      </main>
      <footer>Page created by Jameson Stickle</footer>
    </div>
  );
}

export default App;
