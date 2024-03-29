import Head from "next/head";
import Image from "next/image";
import TableTwitch from "../components/TableTwitch";
import pepoG from "../components/images/3x.png";
import { useState } from "react";

export default function Home() {
  const [twitchUsername, setTwitchUsername] = useState("");
  const [hasChannel, setHasChannel] = useState(false);
  const submitHander = (e) => {
    e.preventDefault();
    setHasChannel(true);
  };

  return (
    <div className="h-full">
      <div className="text-3xl text-center py-5 font-bold text-white fixed top-0 bg-base-300 w-full flex justify-center items-center z-10">
        <h1>Learn stuff with chat</h1>
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
      {!hasChannel && (
        <div className="w-full h-[100vh] justify-center items-center flex ">
          <form
            onSubmit={(e) => submitHander(e)}
            className="bg-base-300 p-7 px-9 flex flex-col space-y-4 rounded-lg"
          >
            <h2 className="text-3xl font-bold py-2 mb-3 text-white">
              Enter your channel name
            </h2>
            <label className="text-xl">
              twitch.tv/<b>username</b>
            </label>
            <input
              onChange={(e) => setTwitchUsername(e.target.value)}
              placeholder="username"
              className="p-3 text-xl rounded-md text-base-300 font-bold"
              value={twitchUsername}
              type="text"
            />
            <button
              type="submit"
              className="btn-xl btn text-xl tracking-wide btn-primary"
            >
              Connect
            </button>
          </form>
        </div>
      )}

      {hasChannel && <TableTwitch channel={twitchUsername} />}
    </div>
  );
}
