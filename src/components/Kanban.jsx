"use client";

import { useState, useRef } from "react";
import TaskFormModal from "./TaskFormModal";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

export default function Kanban() {
    const [columns, setColumns] = useState({
        todo: [
            { id: "1", title: "Task A" },
            { id: "2", title: "Task C" },
            { id: "3", title: "Task D" },
            { id: "4", title: "Task E" },
        ],
        inprogress: [{ id: "5", title: "Task B" }],
        done: [],
    });

    const draggedTaskRef = useRef(null);

    const handleDragStart = (task, fromColumn) => {
        draggedTaskRef.current = { task, fromColumn };
    };

    const handleDrop = (toColumn) => {
        const draggedTask = draggedTaskRef.current;
        if (!draggedTask) return;

        setColumns((prev) => {
            const { task, fromColumn } = draggedTask;
            console.log('fromColumn:', fromColumn)

            console.log('toColumn:', toColumn)
            if (fromColumn === toColumn) return prev;
            const updatedFrom = prev[fromColumn].filter((t) => t.id !== task.id);
            const updatedTo = [task, ...prev[toColumn]];

            return {
                ...prev,
                [fromColumn]: updatedFrom,
                [toColumn]: updatedTo,
            };
        });

        draggedTaskRef.current = null;
    };

    return (
         <div>
             {/* <TaskFormModal/> */}
        <div className="grid grid-cols-3 gap-4 p-6">
           
            {Object.keys(columns).map((col) => (
                <div
                    key={col}
                    className="bg-gray-100 p-4 rounded"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(col)}
                >
                    <h2 className="font-bold mb-3">{col.toUpperCase()}</h2>

                    {columns[col].map((task) => (
                        <div
                            key={task.id}
                            draggable
                            onDragStart={() => handleDragStart(task, col)}
                            className="p-3 bg-white rounded shadow mb-2 cursor-move"
                        >
                            <TaskFormModal/>
                            {task.title}
                        </div>
                    ))}
                </div>
            ))}
        </div>
         </div>
    );
}
