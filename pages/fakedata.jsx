import React from "react";
import ReactTable from "../components/reactTable";

const FakeData = () => {
  return (
    <div className="w-screen bg-white h-full">
      <h1 className="text-4xl text-center p-8 text-base-300 font-bold">
        Fake Data Dashboard
      </h1>
      <ReactTable />
    </div>
  );
};
export default FakeData;
