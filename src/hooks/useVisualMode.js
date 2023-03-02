import { useState } from 'react';

//a Hook that allows our Appointment components to keep track of the "mode" that they are in as a user interacts with them to do things like create a new appointment, delete an appointment, etc

export default function useVisualMode(initMode) {

  //take an initial argument to set the mode state
  //history array to the useVisualMode hook
  const [history, setHistory] = useState([initMode]);

  //take in a new mode and update the mode state with the new value
  const transition = (newMode, replace = false) => {
    if(replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  //transition back to our previous mode
  const back = () => {
    //history limit condition
    if(history.length < 2) {
      return;
    }
    //history is reduced by the current mode
    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
  };

  const mode = history.slice(-1)[0];

  return { mode, transition, back };
}