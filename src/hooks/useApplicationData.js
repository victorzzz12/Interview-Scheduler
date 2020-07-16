import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "../reducer/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
   const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    let daysUrl = "/api/days";
    let appsUrl = "/api/appointments";
    let interviewersUrl = "/api/interviewers";
  
    const promiseDays = axios.get(daysUrl);
    const promiseApps = axios.get(appsUrl);
    const promiseInts = axios.get(interviewersUrl);

    Promise.all([promiseDays, promiseApps, promiseInts]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, value: all });
    })
  }, [])

    function bookInterview(id, interview) {
      const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      };

      const appointments = {
       ...state.appointments,
       [id]: appointment
      };
     
     axios
     .put(`/api/appointments/${id}`, appointment)
     .then(() => {
      dispatch({ type: SET_INTERVIEW, value: appointments });
     })
     .catch((err) => {
      console.error(err)
     });    
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };

   const appointments = {
     ...state.appointments,
     [id]: appointment
   };

  axios
  .delete(`/api/appointments/${id}`)
  .then(() => {    
    dispatch({ type: SET_INTERVIEW, value: appointments });
  })
  .then(() => {
    dispatch({ type: UPDATE_SPOTS });
  })
  .catch((err) => {
    console.error(err)
  }); 
  
}

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };

}