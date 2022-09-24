import React from "react";
import Image from "next/image";

const Thumbnail = (props) => {
  const imgsrc = props.src;
  const url = `https://www.youtube.com/watch?v=${props.url}`;
  return (
    <div>
      <a href={url} target="_blank" rel="noreferrer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={220}
          height={124}
          alt="thumbnail"
          src={imgsrc}
          className="min-w-[100px] min-h-[60px]"
        />
      </a>
    </div>
  );
};

export default Thumbnail;
