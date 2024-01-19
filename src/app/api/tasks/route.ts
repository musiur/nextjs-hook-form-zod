import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const tasks = await db.task.findMany({});
    return Response.json(tasks);
  } catch (error) {
    console.log(error);
    return Response.json("Internal server error!");
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    if (!data) {
      // Handle the case where request.body is empty or not provided
      return Response.json(
        { error: "Request body is required!" },
        { status: 400 }
      );
    }
    const response = await db.task.create({
      data: data,
    });

    
    return Response.json(response);
  } catch (error) {
    console.log(error)
    return Response.json("Internal server error!");
  }
};

