import React from "react";
import Image from "next/image";

const Thumbnail = (props) => {
  const imgsrc = props.src;

  return (
    <div className="flex items-center justify-center w-full">
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.youtube.com/watch?v=${props.vidID}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          style={{ width: "160px", height: "90px" }}
          alt="thumbnail"
          src={imgsrc}
        />
      </a>
    </div>
  );
};

export default Thumbnail;
