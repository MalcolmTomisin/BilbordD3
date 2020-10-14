import React, {
  useEffect, useState
} from 'react';
import logo from './logo.svg';
import './App.css';
import * as json from './counter.json';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('start');
    let startTime = new Date(json.dateStart).getTime();
    let endTime = new Date(json.dateEnd).getTime();
    
    let timeDiff = endTime - startTime;
    let unitTime = Math.round(timeDiff / 12);
    console.log(endTime, unitTime);
    let timeIntervals = [];
    for (let i = 0; i < 12; i++) {
      let intervals = i * unitTime;
      //console.log(intervals);
      timeIntervals.push(startTime + intervals);
    }
    
    //console.log(timeIntervals);
    timeIntervals.push(endTime);
    let reverseIntervals = timeIntervals.reverse();
    let result = new Array(timeIntervals.length).fill([]);
    const { counterHistory } = json;
    //console.log('...', typeof json.counterHistory);
    if (json.counterHistory != null) {
      // reverseIntervals.map((v, i, arr) => {
      //   json.counterHistory.map((val, index, a) => {
      //     let millTimeStamp = new Date(val.timestamp).getTime();
      //     if (v < millTimeStamp) {
      //       result[i].push(val);
      //       a.shift();
      //     }
      //     })
      //   })
      let arrayOfTimeStamps = json.counterHistory.map(v => new Date(v.timestamp).getTime());
      for (let i = 0; i < reverseIntervals.length; i++){
        for (let j = 0; j < arrayOfTimeStamps.length; j++){
          if (arrayOfTimeStamps[j] > reverseIntervals[i]) {
            result[i].push(arrayOfTimeStamps.splice(j,1));
            break;
          }
        }
      }
      console.log(json.counterHistory.length);
    }
    for (let i = 0; i < result.length; i++) {
      console.log(i, result[i].length);
    }
    // console.log(result[0][0]);
    // console.log(result[1][0])
    // console.log('res', result);
    // setData(result);
  },[])
  return (
    <div className="App">
      {/* <div>{`${data}`}</div> */}
    </div>
  );
}

export default App;
