import React from "react";
import "components/DayListItem.scss";
import className from "classnames";

//Day item containing the spots and day name
export default function DayListIem(props) {
  
  //changes class name based on spots remaining
  let itemClass = className("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  //selects the readout of spots to user
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "No spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    return `${spots} spots remaining`;
  };

  return (
    <li
      className={itemClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}