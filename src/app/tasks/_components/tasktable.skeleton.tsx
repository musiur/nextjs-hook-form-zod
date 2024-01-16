import Skeleton from "@/components/core/skeleton.atom";

const TaskTableSkeleton = () => {
  return (
    <div className="w-full min-h-[200px] bg-gray-50 rounded-[10px] p-[16px] flex flex-col gap-[20px]">
      <div className="py-2 flex items-center gap-[16px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => {
          return <Skeleton key={item} />;
        })}
      </div>
      <div className="py-2 flex flex-col items-center gap-[16px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => {
          return (
            <div key={item} className="w-full py-2 flex items-center gap-[16px]">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((td: number) => {
                return <Skeleton key={td} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskTableSkeleton;
