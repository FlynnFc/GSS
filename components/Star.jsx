import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Star = () => {
  return (
    <>
      {favv ? (
        <AiFillStar className="fill-current text-yellow-500" key={fav} />
      ) : (
        <AiOutlineStar />
      )}
    </>
  );
};
export default Star;
