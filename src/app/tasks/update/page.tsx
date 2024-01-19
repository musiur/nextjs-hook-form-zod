/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { GetTask } from "@/app/actions/action";
import { useEffect, useState } from "react";
import UpdateForm from "../_components/update-form";

const Page = ({ searchParams }: { searchParams: any }) => {
  const ID = searchParams.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const FetchData = async () => {
    const response = await GetTask(ID);
    setData(response.result);
    setLoading(false);
  };

  useEffect(() => {
    ID && !data && FetchData();
  }, []);

  return (
    <section className="container">
      <h3 className="pb-[32px]">Create new task</h3>
      {data ? (
        <UpdateForm ID={ID} data={data} />
      ) : loading ? (
        "Loading data..."
      ) : (
        "No data found!"
      )}
    </section>
  );
};

export default Page;
