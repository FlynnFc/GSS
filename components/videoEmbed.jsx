import React, { useState, useEffect } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { ImSpinner6 } from "react-icons/im";

const VideoEmbed = (props) => {
  const [ishidden, setHidden] = useState(true);

  console.log(props.src);
  const linkParser = () => {
    //remove & replace watch?v= with embed/
  };

  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const options = {
    height: "240",
    width: "426",
    playerVars: {
      autoplay: 1,
    },
  };

  const hiddenhandler = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {ishidden ? (
          <AiFillEye className="cursor-pointer" onClick={hiddenhandler} />
        ) : (
          <>
            <ImSpinner6 className="animate-spin z-0 fixed" />
            <iframe
              className={`${ishidden ? "hidden" : "visible"} z-10`}
              width="300"
              height="169"
              src={props.src}
              title="YouTube video player"
              frameBorder="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>{" "}
            <AiOutlineCloseCircle
              className="cursor-pointer"
              onClick={hiddenhandler}
            />
          </>
        )}
      </div>
    </>
  );
};
export default VideoEmbed;
