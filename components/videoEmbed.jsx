import React, { useState } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const VideoEmbed = (props) => {
  const [ishidden, setHidden] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const favHandlerOn = () => {
    props.setFavList((prev) => new Set([...prev, props.src]));
    setIsFav(true);
  };
  const favHandlerOff = () => {
    props.setFavList((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(props.src);
      return new Set([...newSet]);
    });
    setIsFav(false);
  };
  const hiddenhandler = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-start">
      {isFav ? (
        <AiFillStar
          className="cursor-pointer"
          onClick={favHandlerOff}
          id="fav"
        />
      ) : (
        <AiOutlineStar
          className="cursor-pointer"
          onClick={favHandlerOn}
          id="notFav"
        />
      )}
      {ishidden ? (
        <AiFillEye className="cursor-pointer" onClick={hiddenhandler} />
      ) : (
        <>
          <iframe
            className={`${
              ishidden ? "hidden" : "visible"
            } z-10 transition-all overflow-hidden`}
            width="220"
            height="124"
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
  );
};
export default VideoEmbed;
