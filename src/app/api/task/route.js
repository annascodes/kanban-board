import { dbConnect } from "@/lib/dbConnection";
import Task from "@/lib/models/taskModel";
import { NextResponse } from "next/server";
import colors from 'colors'

export async function POST(req) {
    const body= await req.json();
    // console.log(` -- api/tak/route.js => post --`.bgWhite)
    // console.log(body)

    if(!body.title || !body.description || !body.dueDate || body.dueDate === null || body.title.trim()==='', body.description.trim()==='')
        return NextResponse.json({error: 'Need all fields'},{status: 300})
    await dbConnect();

    const newTask = new Task(
        {
            title: body.title,
            description: body.description,
            column: body.column,//
            dueDate: body.dueDate,
            priority: body.priority, //
            tags: body.tags,
        }
    )
    if (!newTask) return NextResponse.json({ error: 'Error in creating new task' }, { status: 500 })
    await newTask.save();

    return NextResponse.json(newTask, {status: 200})

}

export async function GET(params) {

    await dbConnect()
    // const todo = await Task.find({column: 'todo'}).sort({created:-1})
    // const inprogress = await Task.find({column: 'inprogress'}).sort({created:-1})
    // const done = await Task.find({column: 'done'}).sort({created:-1})

    const [todo, inprogress, done] = await Promise.all(
        [
            Task.find({column: 'todo'}).sort({created:-1}),
            Task.find({column: 'inprogress'}).sort({created:-1}),
            Task.find({column: 'done'}).sort({created:-1})
            
        ]
    )

    // also show me how can we do that with promise
    
    return NextResponse.json({todo, inprogress, done})
}