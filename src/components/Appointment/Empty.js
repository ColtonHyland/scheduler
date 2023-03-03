import React from "react";

//an empty appointment container with option to add
export default function Empty(props) {

  //the button for adding an appointment
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}