import { React, useEffect, useMemo, useState } from "react";
import VideoEmbed from "./videoEmbed";
import { useTable } from "react-table";
import { VscChromeClose } from "react-icons/vsc";
import Thumbnail from "./Thumbnail";
import FavVideoEmbed from "./FavVideoEmbed";
const td = require("tinyduration");

export const SavedVideos = (props) => {
  const closeHandler = () => {
    props.setSaveModalOpen(false);
  };

  const [favSubs, setFavSubs] = useState([]);
  const [dupChecker, setDupChecker] = useState(new Set());

  useEffect(() => {
    const subMitter = async (url) => {
      if (dupChecker.has(url)) {
        console.log("Dup Found exiting submitted");
        return;
      } else if (!dupChecker.has(url)) {
        console.log("No dup Found");
        setDupChecker((prevState) => new Set([...prevState, url]));
        const ytfetchurl = `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=snippet&id=${url}&key=AIzaSyBJt6r8FfI6zvJluYPdFPROOid0IFQ3xF4`;
        fetch(ytfetchurl)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw response;
          })
          .then((data) => {
            const title = data.items[0].snippet.title;
            const iframe = <FavVideoEmbed src={url} />;
            const thumbnail = (
              <Thumbnail
                url={url}
                src={data.items[0].snippet.thumbnails.medium.url}
              />
            );

            const channel = data.items[0].snippet.channelTitle;

            const videoDuration = td.parse(
              data.items[0].contentDetails.duration
            );
            const videoLength = `${
              videoDuration.minutes > 0 ? videoDuration.minutes : 0
            } mins ${
              videoDuration.seconds > 0 ? videoDuration.seconds : 0
            } secs`;

            setFavSubs((prev) => {
              if (dupChecker.has(title)) {
                return [...prev];
              } else if (!prev[0] || prev[prev.length - 1].title !== title) {
                return [
                  ...prev,
                  {
                    title,
                    iframe,
                    videoLength,
                    channel,
                    thumbnail,
                  },
                ];
              } else return [...prev];
            });
          });
      }
    };
    props.urlCheck.forEach((element) => {
      subMitter(element);
    });
    console.log(dupChecker);
  }, [dupChecker, props.urlCheck]);
  console.log(favSubs);
  const submissiondata = useMemo(() => [...favSubs], [favSubs]);

  const columns = useMemo(
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
        Header: "",
        accessor: "fav",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: submissiondata });

  return (
    <div className="z-40 bg-gray-800 h-[100vh] fixed left-0 top-0 w-[100vw] flex justify-center items-start text-4xl overflow-y-scroll">
      <VscChromeClose
        onClick={closeHandler}
        className="fixed right-4 top-0 text-3xl cursor-pointer"
      />
      <table {...getTableProps()} className="w-11/12 shadow-lg mb-8 mt-10">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="transition-all"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-white text-xl py-4 bg-yellow-500"
                  key={column.Cell}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
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
                      className="bg-white text-center border-b text-slate-900 font-semibold text-xl"
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
};