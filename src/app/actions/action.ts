"use server";

import { TTaskFormSchema } from "@/lib/types/schemas/taskform.schema.type";
import { revalidateTag } from "next/cache";

export const CreateTask = async (data: TTaskFormSchema) => {
  const response = await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidateTag("tasks");
  return {
    status: result ? true : false,
    message: result ? "Task created successfully" : "Something went wrong!",
  };
};
export const UpdateTask = async (data: TTaskFormSchema, id: string) => {
  // console.log({data})
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  revalidateTag("tasks");
  return {
    status: result ? true : false,
    message: result ? "Task updated successfully" : "Something went wrong!",
  };
};

export const GetTask = async (id: string) => {
  // console.log(id);
  const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
    next: { tags: ["tasks"], revalidate: 0 },
  });
  let result = await response.json();
  // console.log(result)
  return {
    status: result ? true : false,
    result,
  };
};
export const GetTasks = async () => {
  const response = await fetch("http://localhost:3000/api/tasks", {
    next: { tags: ["tasks"], revalidate: 0 },
  });
  const result = await response.json();
  return {
    status: result ? true : false,
    result,
  };
};

export const DeleteTask = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    revalidateTag("tasks");
    return {
      status: result ? true : false,
      result,
    };
  } catch (error) {
    console.log(error);
  }
};
