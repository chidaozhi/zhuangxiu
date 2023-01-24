import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Colors } from "./app/colors";
import "./App.css";
import "./styles/color.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Colors />
    </div>
  );
}

export default App;
