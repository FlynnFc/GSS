import React, { useEffect, useState } from "react";

const Apitest = () => {
  const [videoTitle, setVideoTitle] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const YOUTUBE_VIDEO_ITEMS =
      "https://youtube.googleapis.com/youtube/v3/videos";
    fetch(
      `${YOUTUBE_VIDEO_ITEMS}?part=snippet&id=8YWrmZoUYGs&key=AIzaSyBJt6r8FfI6zvJluYPdFPROOid0IFQ3xF4`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw response;
      })
      .then((data) => {
        const {} = data;
        setVideoTitle(data.items[0].snippet.title);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(data);
  return (
    <div>
      <h2></h2>
    </div>
  );
};
export default Apitest;
