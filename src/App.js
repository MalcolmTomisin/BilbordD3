import React, {
  useEffect, useState, useRef
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from './counter.json';
import * as d3 from 'd3';

function App() {

  const [data, setData] = useState([]);
  const container = useRef(null);

  useEffect(() => {
    //start and end epochs of efiiwe processing
    //video files are usually sped and compressed therefore ratio equivalents of real
    //world recordings are made, then divided into 12 intervals representing 12 hours
    //from 7am - 7pm
    
    let startTime = new Date(json.dateStart).getTime();
    let endTime = new Date(json.dateEnd).getTime();
    
    //
    let timeDiff = endTime - startTime;
    let unitTime = Math.round(timeDiff / 12);
    console.log(endTime, unitTime);
    let timeIntervals = [];
    for (let i = 0; i < 12; i++) {
      let intervals = i * unitTime;
      //console.log(intervals);
      timeIntervals.push(startTime + intervals);
    }
    
    timeIntervals.push(endTime);
    let reverseIntervals = timeIntervals.reverse();
    const { counterHistory } = json;
    let result = new Map();
    if (json.counterHistory != null) {
      let arrayOfTimeStamps = json.counterHistory.map(v => new Date(v.timestamp).getTime());
      for (let i = startTime; i < endTime; i = i + unitTime){
        for (let j = 0; j < arrayOfTimeStamps.length; j++){
          if (arrayOfTimeStamps[j] > i && arrayOfTimeStamps[j] < i+unitTime) {
            //console.log(i, 'here');
            if (result.has(i)) {
              result.set(i, [...result.get(i), json.counterHistory[j]]);
            }
            else {
              result.set(i, [json.counterHistory[j]]);
            }
            }
        }
      }
      // d3.select(container)
      //   .append('p')
      //   .text('Hello');
    }
  },[])
  return (
    <div ref={container} className="App">
      {/* <div>{`${data}`}</div> */}
    </div>
  );
}

export default App;
