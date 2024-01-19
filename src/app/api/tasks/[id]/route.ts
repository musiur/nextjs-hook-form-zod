import { db } from "@/lib/db";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const response = await db.task.findUnique({ where: { id: params.id } });
    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json("Internal server error!");
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const payload = await request.json();
    const response = await db.task.update({
      where: { id: params.id },
      data: { ...payload },
    });
    return Response.json(response);
  } catch (error) {
    console.log(error);
    return Response.json("Internal server error!");
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const response = await db.task.delete({ where: { id } });
    return Response.json({
      result: response,
    });
  } catch (error) {
    console.log(error);
    return Response.json("Internal server error!");
  }
};
