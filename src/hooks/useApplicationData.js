import { useEffect, useState } from "react";
import axios from "axios";

//functions and effects used by the Application
export default function useApplicationData() {

  //defaults the state ready to be set
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  //changes the day in the state
  const setDay = (day) => setState({ ...state, day });

  //finds how many open appointment spots a day has in the state
  const getSpotsCount = (day, appointments) => {
    //iterates the appointments of the particular day
    let count = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      //checks if the spot is filled. incraments the count if not
      if (!appointment.interview) {
        count++;
      }
    }
    return count;
  };

  //changes spots for the day dynamically
  const setSpot = (increase, selectedDay) => {
    setState((prev) => {
      let tempState = { ...prev };
      //filters for the change in the day spots
      tempState.days.filter((day) => {
        //returns a change to the state if a spot has changed
        if (day.name === selectedDay) {
          return increase ? day.spots++ : day.spots--;
        }
      });
      //happy path
      return tempState;
    });
  };

  //gives days an updated version of their spots available
  const updateSpots = (dayName, days, appointments) => {
    //finds the day object from the days
    const day = days.find((dayOfWeek) => dayOfWeek.name === dayName);
    //adds the spots to the day
    const spotsCount = getSpotsCount(day, appointments);
    //replaces the day in days with the spots property
    const daysWithSpots = days.map((dayOfWeek) => {
      if (dayOfWeek.name === dayName) {
        return { ...dayOfWeek, spotsCount };
      }
      return dayOfWeek;
    });
    return daysWithSpots;
  };

  //puts an interview into the database
  const bookInterview = (id, interview) => {
    //appointment and appointments object with the desired interview object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //changes the spots for the given day of the interview
    const spots = updateSpots(state.day, state.days, appointments);
    //puts the appointment into the database and changes the state
    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
      setState({ ...state, appointments, days: spots });
    });
  };

  //removes and interview from the database
  const cancelInterview = (id) => {
    //appointment and appointments object with the interview property null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    //changes the spots for the given day of the interview
    const spots = updateSpots(state.day, state.days, appointments);
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: spots }));
  };

  //hook updates the DOM with DB after the render
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, setSpot, bookInterview, cancelInterview };
}