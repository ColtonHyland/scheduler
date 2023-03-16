import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

//contains all compontents for the scheduler user interface
export default function Application(props) {

  //states and state functions
  const {
    state,
    setDay,
    setSpot,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  //dynamically changes spot as new interviews are booked/removed
  const updateSpot = function (increase) {
    setSpot(increase, state.day);
  };


  //appointments and interviews for the chosen day
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  //maps over the appointments for that day passes it down into the Appointment
  //-component.
  const scheduledAppointments = dailyAppointments.map((appointment) => {
    //retrieve the interview object for that component
    const interview = getInterview(state, appointment.interview);
    //pass the relevant properties and functions into the component
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        updateSpot={updateSpot}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay} 
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduledAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}