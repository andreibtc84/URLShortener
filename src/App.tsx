import React from "react";
import "./App.css";
import { URLShortener } from "./components/URLShortner/URLShortner";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortner</h1>
      </header>
      <main>
        <URLShortener />
      </main>
    </div>
  );
}

export default App;
