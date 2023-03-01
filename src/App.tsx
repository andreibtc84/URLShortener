import "./App.scss";
import { URLShortener } from "./components/URLShortener/URLShortener";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener App</h1>
      </header>
      <main>
        <URLShortener />
      </main>
    </div>
  );
}

export default App;
