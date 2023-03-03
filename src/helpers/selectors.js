//retrieves an appointments for a given day
export function getAppointmentsForDay(state, day) {
  //finds the day of the week
  const filterDays = state.days.find(dayOfWeek => dayOfWeek.name === day);
  //maps over all appointments and returns the ones with matching id
  return !filterDays ? [] : filterDays.appointments.map(id => state.appointments[id]);
};

//gives the interview object and assigns an interviewer
export function getInterview(state, interview) {
  return !interview ? null : {...interview, interviewer: state.interviewers[interview.interviewer]};
};

//retireves interviewers available for a given day
export function getInterviewersForDay(state, day) {
  //finds the day of the week
  const filterDays = state.days.find(dayOfWeek => dayOfWeek.name === day);
  //maps over all interviewers and returns those with a matching id
  return !filterDays ? [] : filterDays.interviewers.map(id => state.interviewers[id]);
};