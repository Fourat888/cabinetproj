import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { useParams } from "react-router-dom";
import { useState,useEffect,Suspense } from "react";

import { queryApi } from "../../utils/queryApi";
import events from "./events";

export default function Schedule() {
  const [rdv,setrdvs]= useState([])
  const [list,setlist]= useState([])

  async function fetchData() {
    const [res, err] = await queryApi("RDV");
    
    console.log(res)
    setrdvs(rdv=>[...rdv,res])
    console.log(rdv)

    res.forEach((element) => {
      let event=    {
        title: element.Patient.Nom+" "+element.Patient.Prenom,
        start: element.Date,
      }
// list.push(event)  
setlist(list=>[...list,event])

})
  }
  useEffect(  () => {
    fetchData()
    console.log(rdv)

       }, []);
  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={list}
      />
    </div>
  );
}