import React from "react";
import "./styles.scss";

import Header from "../../components/Appointment/Header";
import Show from "../../components/Appointment/Show";
import Empty from "../../components/Appointment/Empty";

export default function Appointment(props) {
  console.log(props);
  return (
    <article className="appointment">
    <Header time={props.time} />
    { props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}/> }
    { !props.interview && <Empty />}
    </article>
  );
}