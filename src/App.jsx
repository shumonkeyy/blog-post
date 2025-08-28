import List from "./components/List";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

function App() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className={isActive ? "dark" : "light"}>
        <button
          onClick={() => setIsActive(!isActive)}
          className="btn themeButton"
        >
          {isActive ? (
            <i class="bi bi-moon fa-2x"></i>
          ) : (
            <i class="bi bi-sun fa-2x"></i>
          )}
        </button>
        <List />
      </div>
    </>
  );
}

export default App;
