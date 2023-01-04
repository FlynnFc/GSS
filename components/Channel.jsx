import React, { useMemo } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
const Channel = (props) => {
  return (
    <a
      target="_blank"
      href={`https://www.youtube.com/channel/${props.channelId}`}
      rel="noreferrer"
      className="hover:underline"
    >
      <p className="mr-2">{props.username}</p>
    </a>
  );
};

export default Channel;
