import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

//contains interviews and their properties
export default function InterviewerList(props) {

  //creates a list of interviewers components
  const listInterviewers = props.interviewers.map((interview) => {
    return (
      <InterviewerListItem
        key={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        selected={interview.id === props.interviewer}
        setInterviewer={() => props.onChange(interview.id)}
      />
    );
  });
  return (
    <section>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}

//demands the prop types for interviewers is an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};