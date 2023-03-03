import React from "react";
import "components/InterviewerListItem.scss";
import className from "classnames";

//contains the interviewers properies
export default function InterviewerListItem(props) {

  //selects the interviewers class if clicked
  let itemClass = className("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  //display the name and photo of the interviewer
  return (
    <li className={itemClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
