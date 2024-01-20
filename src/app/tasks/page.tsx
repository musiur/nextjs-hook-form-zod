import { FC, Suspense} from "react";
import { GetTasks } from "../actions/action";
import TaskTable from "./_components/tasktable";
import TaskTableSkeleton from "./_components/tasktable.skeleton";

const Tasks = async () => {
  const response = await GetTasks();
  const taskList = response.result;
  return taskList.length ? (
    <TaskTable data={taskList} />
  ) : (
    <div>Opps! You are free today!</div>
  );
};

const Page: FC = () => {
  return (
    <section className="container">
      <div className="bg-white p-[20px] rounded-[10px] min-h-[70dvh]">
        <h2>Manage Your Tasks</h2>
        <Suspense fallback={<TaskTableSkeleton />}>
          <Tasks />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;
