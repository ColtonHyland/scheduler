import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

//appointment creation form where user inputs name/interviewer selection
export default function Form(props) {

  //states fro the name, error, and interviewer
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  //reverts the interviewer and name
  const reset = () => {
    setInterviewer(null);
    setName("");
  };

  //runs a state revert and executes an appointment cancelation
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //conditional barrier for user input for the appointment
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer must be selected");
      return;
    }
    //reverts the error state and saves the input data
    setError("");
    props.onSave(name, interviewer);
  };

  //displays a name entry field, interviewer selection bar, and a confirm/cancel
  //-option button
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}