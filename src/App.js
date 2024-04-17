import logo from "./logo.svg";
import "./App.css";
import SalesAnalyzer from "./components/SalesAnalyzer/SalesAnalyzer";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <SalesAnalyzer />
    </div>
  );
}

export default App;
