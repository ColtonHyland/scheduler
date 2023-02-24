import React from "react";
import className from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = className("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = (num) => {
    if (num === 1) {
      return (num + " spot remaining");
    } else if (num === 0) {
      return ("no spots remaining");
    } else {
      return (num + " spots remaining");
    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}