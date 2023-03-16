import React from "react";
import DayListIem from "./DayListItem";

//contains the list of days components
export default function DayList(props) {
  const days = [...props.days]

  //list of days with their accompanying properties
  const daysArr = days.map((day) => {
    return (
      <DayListIem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{daysArr}</ul>;
}