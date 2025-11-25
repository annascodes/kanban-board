import { dbConnect } from "@/lib/dbConnection";
import Task from "@/lib/models/taskModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { taskId } = await params;

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const body = await req.json();

  await dbConnect();

  try {
    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      {
        ...(body.column && { column: body.column }),
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.dueDate && { dueDate: body.dueDate }),
        ...(body.priority && { priority: body.priority }),
        ...(body.tags && { tags: body.tags }),
      },
      { new: true }
    );

    if (!updateTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updateTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}
