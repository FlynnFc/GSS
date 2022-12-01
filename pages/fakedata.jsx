import React from "react";
import ReactTable from "../components/reactTable";
import Link from "next/link";
const FakeData = () => {
  return (
    <div className="w-screen h-full pt-10">
      <h1 className="flex justify-center items-center">
        {`I think you're looking for`}
        <Link href={"./"}>
          <button className="btn btn-primary mx-2">this</button>
        </Link>
      </h1>
      {/* <h1 className="text-4xl text-center p-8 text-base-300 font-bold">
        Fake Data Dashboard
      </h1>
      <ReactTable /> */}
    </div>
  );
};
export default FakeData;
