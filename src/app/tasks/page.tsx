"use client";

import { FC, useEffect, useState } from "react";
import { GetTasks } from "../actions/action";
import TaskTable from "./_components/tasktable";
import TaskTableSkeleton from "./_components/tasktable.skeleton";

const Page: FC = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const FetchTableData = async () => {
    const response = await GetTasks();
    setTaskList(response.result);
    setLoading(false);
  };
  useEffect(() => {
    FetchTableData();
  }, []);
  return (
    <section className="container">
      <div className="bg-white p-[20px] rounded-[10px] min-h-[70dvh]">
        <h2>Manage Your Tasks</h2>
        {taskList.length ? (
          <TaskTable data={taskList} />
        ) : loading ? (
          <TaskTableSkeleton />
        ) : (
          <div>Opps! You are free today!</div>
        )}
      </div>
    </section>
  );
};

export default Page;
