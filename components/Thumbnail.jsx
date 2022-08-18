import React from "react";
import Image from "next/image";

const Thumbnail = (props) => {
  const imgsrc = props.src;

  return (
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img width={120} height={90} alt="thumbnail" src={imgsrc} />
    </div>
  );
};

export default Thumbnail;
