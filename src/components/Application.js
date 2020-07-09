import React, { useState, useEffect } from 'react';
import axios from "axios";
import DayList from '../components/DayList';
import InterviewList from "../components/DayList";
import Appointment from "../components/Appointment/index";

import "../components/Application.scss";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
  },
  {
    id: 1,
    time: "3pm",
    interview: {
      student: "Mi",
      interviewer: {
        id: 2,
        name: "Yu",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
  },
  {
    id: 2,
    time: "5pm",
    interview: {
      student: "Kurosaki Ichigo",
      interviewer: {
        id: 4,
        name: "Aizen Sousuke",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  }

];

export default function Application(props) {
  const [days, setDay] = useState([]);

  useEffect(() => {
    axios.get("/api/days").then((response) => {
      console.log(response);
      setDay(response.data);
    });
  }, [])

  const Appointments = appointments.map((app) => {
    return (<Appointment key={app.id} {...app}/>)
  })
  return (
    <main className="layout">
      <section className="sidebar">
        <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList days={days} setDay={setDay} />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
            />
      </section>
      <section className="schedule">
        {Appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  }