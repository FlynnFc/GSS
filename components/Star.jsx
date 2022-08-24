import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Star = () => {
  const [favv, setFav] = useState(false);

  const favHandler = () => setFav((prev) => !prev);

  return (
    <>
      {favv ? (
        <AiFillStar onClick={favHandler} />
      ) : (
        <AiOutlineStar onClick={favHandler} />
      )}
    </>
  );
};
export default Star;
