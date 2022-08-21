import Head from "next/head";
import Image from "next/image";
import TableTwitch from "../components/TableTwitch";
import pepoG from "../components/images/3x.png";

export default function Home() {
  return (
    <div>
      <div className="text-3xl text-center py-5 font-bold text-white fixed bg-slate-700 w-full flex justify-center items-center">
        <h1>Get Smarter Saturday Submissions</h1>
        <span className="ml-4">
          <Image
            alt="emoji of pepe frog being smart"
            height={35}
            width={35}
            src={pepoG}
          />
        </span>
      </div>
      <TableTwitch />
      <footer>test</footer>
    </div>
  );
}
