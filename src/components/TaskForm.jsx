"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function TaskForm({ onSubmit, prebuilt = null, onUpdate = null }) {
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [column, setColumn] = useState("todo");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {
            title,
            description,
            column,
            priority,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
        };
        // console.log('before production: ', task)

        if(task.dueDate === null) {
            // console.log('nonoooooooooooooooooooooooo')
            toast.error('Due date is missing')
        }else{
        onSubmit(task);

        }



        setTitle("");
        setDescription("");
        setColumn("todo");
        setPriority("medium");
        setDueDate("");
        setTags("");
    };
    useEffect(() => {
        if (prebuilt) {
            setId(prebuilt._id || "")
            setTitle(prebuilt.title || "");
            setDescription(prebuilt.description || "");
            setColumn(prebuilt.column || "todo");
            setPriority(prebuilt.priority || "medium");
            setDueDate(prebuilt.dueDate ? prebuilt.dueDate.split("T")[0] : "");
            setTags(prebuilt.tags ? prebuilt.tags.join(", ") : "");
        }
    }, [prebuilt]);

    const handleUpdate = () => {
        const task = {
            id,
            title,
            description,
            column,
            priority,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
        };
        if(task.title.trim()=== '' || task.description.trim()==='')
        {
             
            toast.error('Title or description is invalid')
        }else{
             onUpdate(task)
        }
       
    }
    return (
        <div className=" bg-white rounded-lg ">
            {/* <pre>
                {JSON.stringify(prebuilt, null, 10)}
            </pre> */}

            <h2 className="text-xl font-bold mb-4">
                {prebuilt ? 'Update Task' : 'Add New Task.'}
            </h2>

            <div className="flex flex-col gap-4" >

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea textarea-bordered w-full"
                />

                <select
                    value={column}
                    onChange={(e) => setColumn(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="select select-bordered w-full"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="input input-bordered w-full"
                />

                {
                    prebuilt
                        ? <button onClick={handleUpdate} className="btn btn-primary mt-2">
                            Update
                        </button>
                        : <button onClick={handleSubmit} className="btn btn-primary mt-2">
                            Add Task
                        </button>
                }
                <Toaster/>
            </div>
        </div>
    );
}
