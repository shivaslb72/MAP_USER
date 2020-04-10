import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

function CalendarData(props) {
  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={props.events}
        style={{
          height: "60vh",
          backgroundColor: "#aacfcf",
          backgroundImage: "#ea6227"
        }}
      />
    </div>
  );
}
export default CalendarData;
