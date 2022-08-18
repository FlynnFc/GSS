import React, { useEffect, useState } from "react";

export default function LongAgo(props) {
  const [longTimeAgo, setLongTimeAgo] = useState();

  useEffect(() => {
    if (props.timeSubmitted > 10) {
      setLongTimeAgo(true);
    } else if (props.timeSubmitted < 10) {
      setLongTimeAgo(false);
    }
  }, [props.timeSubmitted]);

  return <p className="text-white">{`${props.timeSubmitted} mins ago`}</p>;
}
