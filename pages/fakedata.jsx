import React from "react";
import ReactTable from "../components/reactTable";

const FakeData = () => {
  return (
    <div className="w-full bg-slate-900">
      <h1 className="text-4xl text-center p-8 text-white font-bold">
        Fake Data Dashboard
      </h1>
      <ReactTable />
    </div>
  );
};
export default FakeData;
