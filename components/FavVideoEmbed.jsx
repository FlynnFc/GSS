import React, { useState } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const FavVideoEmbed = (props) => {
  const [ishidden, setHidden] = useState(true);
  const [isFav, setIsFav] = useState(false);

  const hiddenhandler = () => {
    setHidden((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-start">
      <div className="flex justify-center items-start">
        {ishidden ? (
          <AiFillEye className="cursor-pointer" onClick={hiddenhandler} />
        ) : (
          <>
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
    </div>
  );
};
export default FavVideoEmbed;
