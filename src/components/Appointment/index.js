import React from "react";
import "components/Appointment/styles.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";

//mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

//component field which houses the shifting modes of an appointment
export default function Appointment(props) {
  
  //delcares the mode state and function of an interview
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //enters the interview into the database
  const save = (name, interviewer) => {
    //interview object to be saved
    const interview = {
      student: name,
      interviewer,
    };
    //changes mode to save position
    transition(SAVE);
    //sends the interview to be booked, changes mode to a display
    //-mode, and catches any errors with the axios put by setting
    //-the mode to an error and reverting the previous save
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  };

  //mode change to confirm the cancelation of an appointment
  const cancelInterview = () => {
    transition(CONFIRM);
  };

  //the appointment delete is confirmed and moves the mode back to
  //and empty state
  const confirmDelete = () => {

    //moves mode to a deletion
    transition(DELETE, true);
    //moves mode to confirmation of deletion, and then a mode of
    //-empty. if there is an error here the mode is flipped to an
    //-error in the deletion process
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  //changes mode to and edit
  const editInterview = () => {
    transition(EDIT);
  };

  //calls components depending on the current mode logic. passes in
  //-props and prop functions. any changes will prompt a re-render
  //which will re-evaluate the mode conditions 
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancelInterview}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={confirmDelete}
          onCancel={back}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={back} />
      )}
    </article>
  );
}