import Head from "next/head";
import Image from "next/image";
import ReactTable from "../components/reactTable";
import TableTwitch from "../components/TableTwitch";
import EnhancedTable from "../components/tester";
// import Tablecomponent from "../components/table";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-slate-100">
      <h1 className="text-3xl text-center py-10 font-bold text-black">
        Get Smarter Saturday Submissions
      </h1>
      <TableTwitch />
    </div>
  );
}
