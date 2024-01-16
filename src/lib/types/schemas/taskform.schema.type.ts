import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

export const Status = z.enum(["done", "todo", "in_progress", "backlog"]);
export const Labels = z.enum([
  "good_first",
  "bug",
  "documentation",
  "enhancement",
  "fixing",
]);
export const TaskFormKeys = z.enum([
  "title",
  "description",
  "assignee",
  "start",
  "end",
  "status",
  "label",
]);

export const TaskFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().optional(),
  assignee: z.string().min(5).max(20),
  start: z.date(),
  end: z.date(),
  status: Status.default("todo"),
  label: Labels.array().default([]),
});

export type TTaskFormSchema = z.infer<typeof TaskFormSchema>;
export type TTaskFormKeys = z.infer<typeof TaskFormKeys>;
export type TLabels = z.infer<typeof Labels>;
export type TStatus = z.infer<typeof Status>;
export type TTaskForm = UseFormReturn<TTaskFormSchema>;

// server response types
// @GET
export type TGetTaskTableData = {
  id: string;
  title: string;
  description: string | null;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
  start: Date;
  end: Date;
  label: TLabels[];
  status: TStatus;
};
