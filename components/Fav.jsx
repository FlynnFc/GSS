import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
const Fav = (props) => {
  const [isFav, setIsFav] = useState(false);

  const favHandler = () => {
    setIsFav((prevState) => !prevState);
  };

  const favHandlerOn = () => {
    setIsFav(true);
  };

  const favHandlerOff = () => {
    setIsFav(false);
  };

  return (
    <>
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
    </>
  );
};
export default Fav;
