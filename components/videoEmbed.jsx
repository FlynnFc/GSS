import React, { useState } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const VideoEmbed = (props) => {
  const [ishidden, setHidden] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const favHandlerOn = () => {
    const url = props.src;
    if (!props.urlCheck.has(url)) {
      props.setFavList((prev) => [url, ...prev]);
      props.setUrlCheck((prev) => new Set([url, ...prev]));
    }
    setIsFav(true);
  };
  const favHandlerOff = () => {
    props.setUrlCheck((prev) => {
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
    <div className="flex justify-center items-center">
      {" "}
      {isFav ? (
        <AiFillStar
          className="cursor-pointer absolute right-[5%]"
          onClick={favHandlerOff}
          id="fav"
        />
      ) : (
        <AiOutlineStar
          className="cursor-pointer absolute right-[5%]"
          onClick={favHandlerOn}
          id="notFav"
        />
      )}
      <div className="flex justify-center items-start">
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
              controls="0"
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
    </div>
  );
};
export default VideoEmbed;
