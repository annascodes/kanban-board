"use client";

import { useState } from "react";

export default function TaskForm({ onSubmit }) {
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

        onSubmit(task);

        
        setTitle("");
        setDescription("");
        setColumn("todo");
        setPriority("medium");
        setDueDate("");
        setTags("");
    };

    return (
        <div className=" bg-white rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>

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

                <button onClick={handleSubmit} className="btn btn-primary mt-2">
                    Add Task
                </button>
            </div>
        </div>
    );
}
