import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      {/* Main-navigation */}
      <div className="main-nav">
        <div className="app-name">Chessable</div>
        <div className="auth">
          <div className="btn btn-signup">Signup</div>
          <div className="btn btn-login">Login</div>
        </div>
      </div>
      <div className="body">
        <div className="content-container">
          <div className="options-bar">
            <div>General</div>
            <div>Advance</div>
          </div>
        </div>
        <div className="graphs-container">
          <div className="graphs-header-bar">
            <div>Graphs</div>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
