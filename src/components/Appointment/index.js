import React from 'react';
import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Form from "components/Appointment/Form";
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //sets mode if the time slot exists
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // const showAppointment = () => {
  //   return (props.interview ? <Show
  //     student={props.interview.student}
  //     interviewer={props.interview.interviewer.name}
  //     onEdit={props.onEdit}
  //     onDelete={props.onDelete}
  //   /> : <Empty
  //     onAdd={props.setDay}
  //   />);
  // };

  //renders appointments for the specified time slot, else and empty slot
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && ( <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />)}
      {mode === CREATE && <Form
      interviewers={[]}
      onConfirm={props.onConfirm}
      onCancel={() => back()}
      />}
    </article>
  );

}