// const selectuserByName = (state, name) => {
//   const fiteredNames = state.users.filter(user => user.name === name);
//   return fiteredNames;
// }
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  const filterDays = state.days.find(currDay =>
    currDay.name === day);
  return !filterDays ? [] : filterDays.appointments.map(apptID =>
    state.appointments[apptID]);
}

export function getInterview(state, interview) {
  //...return an object that contains the interview data if it is passed an object that contains an interviewer
  return !interview ? null : {student: interview.student, interviewer: state.interviewers[interview.interviewer]}

}

export function getInterviewersForDay(state, day) {
  //... returns an arry of interviewers for that day
  
  const filterDays = state.days.find(currDay => currDay.name === day);
  return !filterDays ? [] : filterDays.interviewers.map(apptID => state.interviewers[apptID]);
};