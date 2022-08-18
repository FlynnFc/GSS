import React, { useState } from "react";
import { useTable } from "react-table";
import VideoEmbed from "./videoEmbed";

export default function ReactTable() {
  const tmi = require("tmi.js");

  const client = new tmi.Client({
    channels: ["notthemarmite"],
  });

  client.connect();

  client.on("message", (channel, tags, message, self) => {
    // "Alca: Hello, World!"
    console.log(`${tags["display-name"]}: ${message}`);
  });

  const [submissions, setSubmissions] = useState([]);

  const data = React.useMemo(
    () => [
      {
        col1: "How Does Kodak Apply Light Sensitive Coating to Film?",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
        col5: <p style={{ color: "red" }}>25 mins ago</p>,
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "6 mins",
        col4: <p style={{ color: "white" }}>Testing styling</p>,
        col5: <p style={{ color: "green" }}>2 mins ago</p>,
      },
      {
        col1: "The 4 things it takes to be an expert",
        col2: <VideoEmbed src="https://www.youtube.com/embed/5eW6Eagr9XA" />,
        col3: "17 mins",
        col4: "BiggestBeliver",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Video Title",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Video",
        accessor: "col2",
      },
      {
        Header: "Length",
        accessor: "col3",
      },
      {
        Header: "Submitted by",
        accessor: "col4",
      },
      {
        Header: "Time Submitted",
        accessor: "col5",
      },
    ],
    []
  );

  const tableInstance = useTable({ data, columns });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="flex justify-center">
      <table {...getTableProps} className="w-9/12 shadow-lg ">
        <thead>
          <tr className="border-2 text-white rounded-lg">
            <th className="p-4">Video Title</th>
            <th className="p-4">Video Embed</th>
            <th className="p-4">Video Length</th>
            <th className="p-4">Submitted by</th>
            <th className="p-4">Time Submitted</th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="border-2 border-x-white"
                key={row.id}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="bg-slate-700 text-center text-white text-xl p-2"
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
