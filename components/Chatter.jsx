import React from "react";
import BsTwitch from "react-icons/bs";
const Chatter = (props) => {
  return (
    <span
      style={{ backgroundColor: props.color }}
      className={`text-white rounded-lg p-2 font-semibold mx-2 text-lg`}
    >
      {props.username}
    </span>
  );
};
export default Chatter;
