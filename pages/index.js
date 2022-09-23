import Head from "next/head";
import Image from "next/image";
import TableTwitch from "../components/TableTwitch";
import pepoG from "../components/images/3x.png";

export default function Home() {
  return (
    <div className="h-full">
      <div className="text-3xl text-center py-5 font-bold text-white fixed top-0 bg-slate-700 w-full flex justify-center items-center">
        <h1>Get Smarter Saturday Submissions</h1>
        <a
          className="ml-4"
          target="_blank"
          href="https://twitter.com/lutafatootoo"
          rel="noreferrer"
        >
          <Image
            alt="emoji of smart pepe frog"
            height={35}
            width={35}
            src={pepoG}
          />
        </a>
      </div>
      <TableTwitch />
    </div>
  );
}
