import { cn } from "@/lib/utils";

const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "w-full min-h-[24px] rounded bg-gray-200 animate-pulse"
      )}
    ></div>
  );
};
export default Skeleton;
