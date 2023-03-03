import React from "react";
import "components/Button.scss";
import classNames from "classnames";

//component which executes the action of generic parent's
//-needs.
export default function Button(props) {

  //changes the buttons class as per parents props
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
   });

   return (
      <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={buttonClass}
      >
        {props.children}
      </button>
   );
}