import Head from "next/head";
import Image from "next/image";
import ReactTable from "../components/reactTable";
import TableTwitch from "../components/TableTwitch";
import EnhancedTable from "../components/tester";
// import Tablecomponent from "../components/table";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl text-center py-10 font-bold text-gray-900">
        Get Smarter Saturday Submissions
      </h1>
      <TableTwitch />
    </div>
  );
}
