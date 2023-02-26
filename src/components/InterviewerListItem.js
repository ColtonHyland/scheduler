import React from 'react';
import className from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {

  const interviewerClass = className("interviewers__item", {
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}