import React from "react";
import BsTwitch from "react-icons/bs";
const Chatter = (props) => {
  return (
    <span
      style={{ backgroundColor: props.color }}
      className={
        props.color
          ? `text-white rounded-lg p-2 font-semibold mx-2 text-lg`
          : `text-slate-900 rounded-lg p-2 font-semibold text-lg mx-2`
      }
    >
      {props.username}
    </span>
  );
};
export default Chatter;
