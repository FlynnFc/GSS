import React, { useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import VideoEmbed from "./videoEmbed";

import tmi from "tmi.js";

const defaultChannel = "atrioc";

const client = new tmi.Client({
  channels: [defaultChannel],
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
    const subMitter = async (tags, message) => {
      if (message.includes("https://www.youtube.com/")) {
        let regExp =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = message.match(regExp);
        const url = match && match[7].length == 11 ? match[7] : false;

        const ytfetchurl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${url}&key=AIzaSyBJt6r8FfI6zvJluYPdFPROOid0IFQ3xF4`;

        fetch(ytfetchurl)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw response;
          })
          .then((data) => {
            const iframe = <VideoEmbed src={url} />;
            const submittedTime = new Date();
            const chatter = tags.username;
            const videoLength = "N/A";
            let time =
              submittedTime.getHours() +
              ":" +
              submittedTime.getMinutes() +
              ":" +
              submittedTime.getSeconds();
            const title = data.items[0].snippet.title;
            setSubmissions((prev) => [
              { title, iframe, videoLength, chatter, time },
              ...prev,
            ]);
          });
      } else return;
    };

    const messageHandler = (channel, tags, message, self) => {
      setURLChecker((prev) => new Set([message, ...prev]));
      if (urlChecker.has(message)) {
        return;
      }
      setChatMessages((prev) => [{ channel, tags, message }, ...prev]);
      subMitter(tags, message);
    };

    if (isClientReady) {
      client.on("message", messageHandler);
    }

    return () => client.off("message", messageHandler);
  }, [chatMessages, isClientReady, urlChecker, urlID, videoTitle]);

  const messageParser = (submittedURL) => {};

  const submissiondata = React.useMemo(() => [...submissions], [submissions]);

  console.log(submissions);

  const columns = React.useMemo(
    () => [
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
    <div className="flex justify-center items-center text-white">
      <table {...getTableProps()} className="w-11/12 shadow-lg">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="transition-all"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-white text-xl py-4 bg-slate-500"
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
                className="border-2 border-x-white transition-all"
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="bg-slate-700 text-center text-inherit text-xl p-2"
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
