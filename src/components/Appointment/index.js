import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';

export default function Appointment(props) {

  const showAppointment = () => {
    return (props.interview ?  <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer.name}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    /> : <Empty
      onAdd={props.setDay}
    />)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {showAppointment()}
    </article>
  );

}