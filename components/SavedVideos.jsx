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
  const [firstLoad, setFristLoad] = useState(true);
  useEffect(() => {
    const subMitter = async (url) => {
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

          const videoDuration = td.parse(data.items[0].contentDetails.duration);
          const videoLength = `${
            videoDuration.minutes > 0 ? videoDuration.minutes : 0
          } mins ${videoDuration.seconds > 0 ? videoDuration.seconds : 0} secs`;

          setFavSubs((prev) => {
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
          });
        });
    };
    if (!firstLoad) {
      props.urlCheck.forEach((element) => {
        if (!dupChecker.has(element)) {
          setDupChecker((prevState) => new Set([...prevState, element]));
          setTimeout(() => subMitter(element), 50);
        }
      });
    } else setFristLoad(() => false);
  }, [dupChecker, firstLoad, props.urlCheck]);

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
    <div className="z-40 bg-[#0f0f0fc0] h-[100vh] fixed left-0 top-0 w-[100vw] flex justify-center flex-row items-start text-4xl overflow-y-scroll">
      <table {...getTableProps()} className="w-8/12 shadow-lg mb-8 mt-10">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="transition-all"
              key={headerGroup}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-white text-xl py-4 bg-blue-500"
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
                      className="bg-base-100 text-center border-b border-base-300 text-white font-semibold text-xl"
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
      </table>{" "}
      <VscChromeClose
        onClick={closeHandler}
        className="top-[2.3%] right-[2%] text-3xl cursor-pointer bg-red-500 rounded shadow-lg mt-10 ml-5"
      />
    </div>
  );
};
