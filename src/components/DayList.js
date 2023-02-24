import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const listDays = props.days.map((num) =>
  <DayListItem 
        key={num.id}
        name={num.name} 
        spots={num.spots} 
        selected={num.name === props.day}
        setDay={props.setDay}  
      />
  ); 

  return (
    <ul>{listDays}</ul>
  );
}