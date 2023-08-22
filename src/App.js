import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [time,setTime] = useState(0)
  const [isRunning,setIsRunning] = useState(false)
  const [laps,setLaps] = useState([])


  const getMin = ms => ('0' + Math.floor((ms / 1000 / 60) % 60)).slice(-2)
  const getSec = ms => ('0' + Math.floor((ms / 1000) % 60)).slice(-2)
  const getHundredth = ms => ('0' + (ms / 10) % 100).slice(-2)


  const formatTime = ms => `${getMin(ms)}:${getSec(ms)}.${getHundredth(ms)}`

  useEffect(() => {
    let interval;
    if(isRunning){
      interval = setInterval(()=> {setTime(time => time + 10)},
      10)
    }

    return () => clearInterval(interval);
  },[isRunning])

  useEffect(() => {
    if (time){
      const rest = laps.slice(0,laps.length-1)
      let last = laps[laps.length-1]
      last = time - rest.reduce((acc,v) => acc+v , 0)
      setLaps([...rest,last])
    }
    else {
      setLaps([])
    }
  },[time])

  return (
    <div className="App">
      <div className="display">{formatTime(time)}</div>
      <div className="buttons">
        {!isRunning && !time && <button onClick={() => setIsRunning(true)}>Start</button>}
        {!isRunning && time > 0 && <button onClick={() => setIsRunning(true)}>Resume</button>}
        {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
        {isRunning &&<button onClick={() => setLaps([...laps, 0])}>Lap</button>}
        {!isRunning && time>0 && <button onClick={() => setTime(0)}>Reset</button>}

      </div>
    </div>
  );
}

export default App;
