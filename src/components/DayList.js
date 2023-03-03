import React from "react";
import DayListIem from "./DayListItem";

//contains the list of days components
export default function DayList(props) {

  //list of days with their accompanying properties
  const daysArr = props.days.map((day) => {
    return (
      <DayListIem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{daysArr}</ul>;
}