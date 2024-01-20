"use server";

import { TTaskFormSchema } from "@/lib/types/schemas/taskform.schema.type";
import { revalidatePath, revalidateTag } from "next/cache";

const BASEURL = process.env.BASEURL;

export const CreateTask = async (data: TTaskFormSchema) => {
  const response = await fetch(`${BASEURL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  // revalidateTag("tasks");
  revalidatePath("/tasks");
  return {
    status: result ? true : false,
    message: result ? "Task created successfully" : "Something went wrong!",
  };
};
export const UpdateTask = async (data: TTaskFormSchema, id: string) => {
  // console.log({data})
  const response = await fetch(`${BASEURL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidatePath("/tasks");
  return {
    status: result ? true : false,
    message: result ? "Task updated successfully" : "Something went wrong!",
  };
};

export const GetTask = async (id: string) => {
  // console.log(id);
  const response = await fetch(`${BASEURL}/tasks/${id}`, {
    cache: "no-store",
  });
  let result = await response.json();
  // console.log(result)
  return {
    status: result ? true : false,
    result,
  };
};
export const GetTasks = async () => {
  try {
    const response = await fetch(`${BASEURL}/tasks`, {
      cache: "no-store",
    });
    const result = await response.json();
    return {
      status: result ? true : false,
      result: result.length ? result : [],
    };
  } catch (error) {
    console.log(error);
    return { result: [] };
  }
};

export const DeleteTask = async (id: string) => {
  try {
    const response = await fetch(`${BASEURL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    revalidatePath("tasks");
    return {
      status: result ? true : false,
      result,
    };
  } catch (error) {
    console.log(error);
  }
};
