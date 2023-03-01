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