import React from "react";

const Chatter = (props) => {
  return (
    <span
      style={{ backgroundColor: props.color }}
      className={
        props.color
          ? `text-white rounded-lg p-2 font-semibold mx-3`
          : `text-slate-900 rounded-lg p-2 font-semibold mx-3`
      }
    >
      {props.username}
    </span>
  );
};
export default Chatter;
