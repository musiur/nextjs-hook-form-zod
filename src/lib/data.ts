export type TFeatureLink = { id: number; text: string; link: string };
export const FeatureLinks: TFeatureLink[] = [
  {
    id: 1,
    text: "Task table",
    link: "/tasks",
  },
  {
    id: 2,
    text: "Add new task",
    link: "/tasks/add",
  },
  {
    id: 3,
    text: "Update any task",
    link: "/tasks",
  },
  {
    id: 4,
    text: "Delete any task",
    link: "/tasks",
  },
];
