"use server";

import { db } from "@/lib/db";
import {
  TTaskFormSchema,
} from "@/lib/types/schemas/taskform.schema.type";
import { convertPrismaResultToPlainObject } from "@/lib/utils";
import { revalidatePath, revalidateTag } from "next/cache";
const revalidate = () => {
  revalidatePath('/', 'layout')
}
export const CreateTask = async (data: TTaskFormSchema) => {
  const result = await db.task.create({
    data,
  });
  revalidate();
  return {
    status: result ? true : false,
    message: result ? "Task created successfully" : "Something went wrong!",
  };
};
export const UpdateTask = async (data: TTaskFormSchema, id: string) => {
  const result = await db.task.update({
    where: {
      id,
    },
    data,
  });
  revalidate();
  return {
    status: result ? true : false,
    message: result ? "Task updated successfully" : "Something went wrong!",
  };
};

export const GetTask = async (id: string) => {
  console.log(id);
  const result = await db.task.findRaw({ filter: { _id: { $oid: id } } });
  const data: TTaskFormSchema = convertPrismaResultToPlainObject(result[0]);
  return {
    status: result.length ? true : false,
    result: data,
  };
};
export const GetTasks = async () => {
  const result = await db.task.findMany();
  console.log(result);
  return {
    status: result ? true : false,
    result,
  };
};

export const DeleteTask = async (id: string) => {
  const result = await db.task.delete({ where: { id } });
  console.log(result);
  revalidate();
  return {
    status: result ? true : false,
    message: result ? "Task deleted successfully" : "Something went wrong!",
  };
};
