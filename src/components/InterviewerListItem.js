import React from 'react';

import "../components/InterviewerListItem.scss";

const classNames = require("classnames");

export default function InterviewerListItem(props) {
  const InterviewerClass = classNames("interviewers", {
    "interviewers__item": true,
    "interviewers-image": true,
    "interviewers--selected": true,
    "interviewers--selected-image": true
  });

  return (
    <li className={InterviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}