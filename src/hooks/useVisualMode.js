import { useState } from 'react';

//a Hook that allows our Appointment components to keep track of the "mode" that they are in as a user interacts with them to do things like create a new appointment, delete an appointment, etc

export default function useVisualMode(initMode) {

  //hook state defaults to an initial mode
  const [history, setHistory] = useState([initMode]);

  //changes mode to a new 
  const transition = (newMode, replace = false) => {
    //either the mode history is replaced or appended 
    if(replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  //moves the mode back one position
  const back = () => {
    //limits the history from being empties
    if(history.length < 2) {
      return;
    }
    //history is set to the current minus the current mode
    setHistory((prev) => {
      const historyBack = [...prev];
      historyBack.pop();
      return historyBack;
    });
  };

  //the latest mode of the current state
  const mode = history.slice(-1)[0];

  return { mode, transition, back };
}