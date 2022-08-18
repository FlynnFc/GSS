import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import VideoEmbed from "./videoEmbed";
import LongAgo from "./longAgo";

export default function ReactTable() {
  const [submissions, setSubmissions] = useState([
    {
      videoTitle: "How Does Kodak Apply Light Sensitive Coating to Film?",
      src: "https://www.youtube.com/embed/cAAJUHwh9F4",
      videoLength: "1 hour",
      submittedBy: "BiggestBeliver",
      timeSubmitted: 2,
    },
    {
      videoTitle: "How Pixar Changed 3D Animation With Every Movie",
      src: "https://www.youtube.com/embed/n1xAYik1g-w",
      videoLength: "13 mins",
      submittedBy: "John",
      timeSubmitted: 12,
    },
    {
      videoTitle: "The Stagnating Economy of Canada?",
      src: `https://www.youtube.com/embed/GtksJpfoM_g`,
      videoLength: "13 mins",
      submittedBy: "BobbyBeliever",
      timeSubmitted: 32,
    },
    {
      videoTitle: "The Simple Secret of Runway Digits?",
      src: `https://www.youtube.com/embed/qD6bPNZRRbQ`,
      videoLength: "17 mins",
      submittedBy: "BiggestBeliver",
      timeSubmitted: 2,
    },
    {
      videoTitle: "Is Civilization on the Brink of Collapse?",
      src: `https://www.youtube.com/embed/W93XyXHI8Nw`,
      videoLength: "11 mins",
      submittedBy: "Soupman",
      timeSubmitted: 1,
    },
    {
      videoTitle: "Why is Gen Z Humor So Weird?",
      src: `https://www.youtube.com/embed/oVlspd9hxFA`,
      videoLength: "10 mins",
      submittedBy: "Pope Francis",
      timeSubmitted: 1,
    },
    {
      videoTitle: "The Hidden Shortcuts of Mario Kart Double Dash",
      src: `https://www.youtube.com/embed/ToO7IeVx1y8`,
      videoLength: "41 mins",
      submittedBy: "Gao",
      timeSubmitted: 2,
    },
  ]);

  const data = React.useMemo(
    () => [
      {
        col1: submissions[0].videoTitle,
        col2: <VideoEmbed src={submissions[0].src} />,
        col3: submissions[0].videoLength,
        col4: submissions[0].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[0].timeSubmitted} />,
      },
      {
        col1: submissions[1].videoTitle,
        col2: <VideoEmbed src={submissions[1].src} />,
        col3: submissions[1].videoLength,
        col4: submissions[1].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[1].timeSubmitted} />,
      },
      {
        col1: submissions[2].videoTitle,
        col2: <VideoEmbed src={submissions[2].src} />,
        col3: submissions[2].videoLength,
        col4: submissions[2].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[2].timeSubmitted} />,
      },
      {
        col1: submissions[3].videoTitle,
        col2: <VideoEmbed src={submissions[3].src} />,
        col3: submissions[3].videoLength,
        col4: submissions[3].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[3].timeSubmitted} />,
      },
      {
        col1: submissions[4].videoTitle,
        col2: <VideoEmbed src={submissions[4].src} />,
        col3: submissions[4].videoLength,
        col4: submissions[4].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[4].timeSubmitted} />,
      },
      {
        col1: submissions[5].videoTitle,
        col2: <VideoEmbed src={submissions[5].src} />,
        col3: submissions[5].videoLength,
        col4: submissions[5].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[5].timeSubmitted} />,
      },
      {
        col1: submissions[6].videoTitle,
        col2: <VideoEmbed src={submissions[6].src} />,
        col3: submissions[6].videoLength,
        col4: submissions[6].submittedBy,
        col5: <LongAgo timeSubmitted={submissions[6].timeSubmitted} />,
      },
    ],
    [submissions]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Video Title",
        accessor: "col1",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns }, useSortBy);

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
