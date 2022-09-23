import React, { useState, useEffect } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";

const VideoEmbed = (props) => {
  const [ishidden, setHidden] = useState(true);

  const hiddenhandler = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex justify-center items-start">
        {ishidden ? (
          <AiFillEye className="cursor-pointer" onClick={hiddenhandler} />
        ) : (
          <>
            <ImSpinner6 className="animate-spin z-0 fixed" />
            <iframe
              className={`${
                ishidden ? "hidden" : "visible"
              } z-10 transition-all overflow-hidden`}
              width="426"
              height="240"
              src={`https://www.youtube.com/embed/${props.src}`}
              title="YouTube video player"
              frameBorder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>{" "}
            <AiOutlineCloseCircle
              className="cursor-pointer flex self-baseline"
              onClick={hiddenhandler}
            />
          </>
        )}
      </div>
    </>
  );
};
export default VideoEmbed;
