import Head from "next/head";
import Image from "next/image";
import EnhancedTable from "../components/tester";
// import Tablecomponent from "../components/table";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-slate-800">
      <EnhancedTable />
    </div>
  );
}
