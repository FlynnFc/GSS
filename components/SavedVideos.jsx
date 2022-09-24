import { React } from "react";
import VideoEmbed from "./videoEmbed";
import { useTable } from "react-table";
import { VscChromeClose } from "react-icons/vsc";
import { useContext } from "react";

export const SavedVideos = (props) => {
  const { message } = useContext(AppContext);
  const closeHandler = () => {
    props.setSaveModalOpen(false);
  };
  console.log(props.submissions);
  const submissiondata = React.useMemo(
    () => [...props.submissions],
    [props.submissions]
  );

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
      {
        Header: "Remove",
        accessor: "fav",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: submissiondata });

  return (
    <div className="z-40 bg-gray-800 h-[100vh] fixed left-0 top-0 w-[100vw] flex justify-center items-start text-4xl">
      <h1>{message}</h1>
      <VscChromeClose
        onClick={closeHandler}
        className="fixed right-0 top-0 text-3xl cursor-pointer"
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
};
