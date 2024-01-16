import { Suspense } from "react";
import { GetTasks } from "../actions/action";
import TaskTable from "./_components/tasktable";
import TaskTableSkeleton from "./_components/tasktable.skeleton";
import { MockLoading } from "@/lib/utils";

const TaskList = async () => {
  "use server";
  // await MockLoading();
  "no-store";
  const tasklist = await GetTasks();
  return tasklist.status ? (
    <TaskTable data={tasklist.result} />
  ) : (
    <div>Opps! You are free today!</div>
  );
};

const Page = () => {
  return (
    <section className="container">
      <div className="bg-white p-[20px] rounded-[10px] min-h-[70dvh]">
        <h2>Manage Your Tasks</h2>
        <Suspense fallback={<TaskTableSkeleton />}>
          <TaskList />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
