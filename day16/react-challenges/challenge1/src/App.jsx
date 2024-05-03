import React, { useState } from "react";
import "./styles.css";

/* Visit www.reactchallenges.live */

/* Instructions: 
   Create a Progress Bar that should fill based on the input percentage value
*/

function ProgressBar({ width }) {
  const cssRule = { width: `${width}%` };
  console.log(cssRule);
  return (
    <div className="progress-container">
      <div className="progress" style={cssRule}></div>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(100);
  const setValuer = (val) => {
    if (val <= 100) {
      setProgress(val);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Progress bar</h1>
        <ProgressBar width={progress} />
        <form>
          <label for="html">Input Percentage:</label>
          <input type="number" onChange={(e) => setValuer(e.target.value)} />
        </form>
      </div>
    </>
  );
}
