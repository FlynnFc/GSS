import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import VideoEmbed from "./videoEmbed";
const td = require("tinyduration");

import tmi from "tmi.js";
import Thumbnail from "./Thumbnail";
import Chatter from "./Chatter";

const defaultChannel = "notthemarmite";

const client = new tmi.Client({
  channels: [defaultChannel, "atrioc"],
});

export default function TableTwitch() {
  const [submissions, setSubmissions] = useState([]);
  const [isClientReady, setIsClientReady] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [urlChecker, setURLChecker] = useState(new Set());
  const [videoTitle, setVideoTitle] = useState("t");
  const [urlID, setURLID] = useState();

  useEffect(() => {
    (async () => {
      await client.connect();
      setIsClientReady(true);
    })();
  }, []);

  useEffect(() => {
    const subMitter = async (tags, url, message) => {
      if (
        message.includes("https://www.youtube.com/") ||
        message.includes("https://youtu.be/")
      ) {
        const ytfetchurl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&id=${url}&key=AIzaSyBJt6r8FfI6zvJluYPdFPROOid0IFQ3xF4`;

        fetch(ytfetchurl)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw response;
          })
          .then((data) => {
            const iframe = <VideoEmbed src={url} />;
            const thumbnail = (
              <Thumbnail
                url={url}
                src={data.items[0].snippet.thumbnails.medium.url}
              />
            );
            const submittedTime = new Date();

            const chatter = (
              <Chatter color={tags.color} username={tags.username} />
            );
            const title = data.items[0].snippet.title;
            // const chatter = tags.username;
            const channel = data.items[0].snippet.channelTitle;

            const videoDuration = td.parse(
              data.items[0].contentDetails.duration
            );
            const videoLength = `${
              videoDuration.minutes > 0 ? videoDuration.minutes : 0
            } mins ${
              videoDuration.seconds > 0 ? videoDuration.seconds : 0
            } secs`;
            const hours =
              submittedTime.getHours() < 10
                ? `0${submittedTime.getHours()}`
                : submittedTime.getHours();
            const minutes =
              submittedTime.getMinutes() < 10
                ? `0${submittedTime.getMinutes()}`
                : submittedTime.getMinutes();
            const seconds =
              submittedTime.getSeconds() < 10
                ? `0${submittedTime.getSeconds()}`
                : submittedTime.getSeconds();
            let time = `${hours}:${minutes}:${seconds}`;

            setSubmissions((prev) => {
              if (!prev[0] || prev[0].title !== title) {
                return [
                  {
                    title,
                    iframe,
                    videoLength,
                    chatter,
                    time,
                    channel,
                    thumbnail,
                  },
                  ...prev,
                ];
              } else return [...prev];
            });
          });
      } else return;
    };

    const messageHandler = (channel, tags, message, self) => {
      if (self) {
        return;
      }
      let regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      let match = message.match(regExp);
      const url = match && match[7].length == 11 ? match[7] : false;
      setURLChecker((prev) => new Set([url, ...prev]));
      if (!urlChecker.has(url)) {
        setChatMessages((prev) => [{ channel, tags, message }, ...prev]);
        subMitter(tags, url, message);
      }
    };

    if (isClientReady) {
      client.on("message", messageHandler);
    }

    return () => client.off("message", messageHandler);
  }, [isClientReady, submissions, urlChecker]);

  const submissiondata = React.useMemo(() => [...submissions], [submissions]);

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "thumbnail",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Video",
        accessor: "iframe",
      },
      {
        Header: "Length",
        accessor: "videoLength",
      },
      {
        Header: "Channel",
        accessor: "channel",
      },
      {
        Header: "Submitted by",
        accessor: "chatter",
      },
      {
        Header: "Time Submitted",
        accessor: "time",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: submissiondata }, useSortBy);

  return (
    <div className="flex justify-center items-center text-white h-full w-full bg-slate-200">
      <table {...getTableProps()} className="w-11/12 shadow-lg mb-8">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="transition-all"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-white text-xl py-4 bg-slate-700"
                  key={column.Cell}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="transition-all"
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="bg-white text-center border-b text-slate-900 font-semibold text-xl p-2"
                      key={cell.value}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
