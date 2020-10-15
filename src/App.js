import React, {
  useEffect, useState, useRef
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from './counter.json';
import * as d3 from 'd3';

function App() {

  const [data, setData] = useState(new Map());
  const container = useRef(null);
  const [hourlyData, setHourlyData] = useState([]);

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
    let specifics = new Array();
    if (json.counterHistory != null) {
      let arrayOfTimeStamps = json.counterHistory.map(v => new Date(v.timestamp).getTime());
      for (let i = startTime; i < (startTime + unitTime * 12); i = i + unitTime){
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

      let count = { car: 0, truck: 0, person: 0, bus: 0, motorbike: 0, bicycle: 0, };
      for (let [key, value] of result) {
        for (let i = 0; i < value.length; i++) {
          if(value[i].name === "car"){count.car++}
          if (value[i].name === "truck") { count.truck++}
          if(value[i].name === "person"){count.person++}
          if(value[i].name === "bus"){count.bus++}
          if(value[i].name === "motorbike"){count.motorbike++}
          if (value[i].name === "bicycle") { count.bicycle++ }
          if (i === value.length - 1) {
            specifics.push(count);
            console.log(key,count);
            count = {
              car: 0,
              truck: 0,
              person: 0,
              bus: 0,
              motorbike: 0,
              bicycle: 0,
            };
          }
        }
      }
      setHourlyData(specifics);
    }
  },[])
  return (
    <div ref={container} className="App">
      <div>{`${JSON.stringify(hourlyData)}`}</div>
    </div>
  );
}

export default App;
