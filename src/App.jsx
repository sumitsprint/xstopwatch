import { useState, useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

   const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
   }
   useEffect(() => {
  if (isRunning) {
    const tick = () => {
      setSeconds(prev => prev + 1);
      timerRef.current = setTimeout(tick, 1000); // schedule next tick
    };
    timerRef.current = setTimeout(tick, 1000);
  }
  return () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };
}, [isRunning]);

  return (
    
       <div>
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(seconds)}</p>

      {isRunning ? (<button onClick = {() => setIsRunning(false)} style = {{marginRight: "8px", backgroundColor: "blue"}}>Stop</button>) : (<button onClick={() => setIsRunning(true)} style = {{marginRight: "8px", backgroundColor: "blue"}}>Start</button>)}
      <button onClick = {() => { clearTimeout(timerRef.current); setSeconds(0); setIsRunning(false);}} style = {{backgroundColor: "blue"}}>Reset</button>
    </div>
  )
}

export default App
