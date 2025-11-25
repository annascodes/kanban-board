'use client'
import Kanban from '@/components/Kanban'
import TaskCard from '@/components/TaskCard'
import TaskFormModal from '@/components/TaskFormModal'
import useApiReq from '@/lib/hooks/useApiReq'
import useApiReqTask from '@/lib/hooks/useApiReqTask'
import React, { useEffect, useRef, useState } from 'react'
import { LuPencil } from "react-icons/lu";

const page = () => {
    const { request, data, loading, err } = useApiReq()
    const { request: taskReq, loadingTasks = {} } = useApiReqTask();

    const [tasks, setTasks] = useState(null)
    useEffect(() => {
        request(`/api/task`)
    }, [])

    useEffect(() => {
        if (data) {
            setTasks(data)
        }
    }, [data])



    // -------------
    const draggedTaskRef = useRef(null);

    const handleDragStart = (task, fromColumn) => {
        draggedTaskRef.current = { task, fromColumn };
    };

    const handleDrop = (toColumn) => {
        const draggedTask = draggedTaskRef.current;
        if (!draggedTask) return;

        setTasks((prev) => {
            const { task, fromColumn } = draggedTask;

            if (fromColumn === toColumn) return prev;
            const updatedFrom = prev[fromColumn].filter((t) => t._id !== task._id);
            const updatedTo = [task, ...prev[toColumn]];

            return {
                ...prev,
                [fromColumn]: updatedFrom,
                [toColumn]: updatedTo,
            };
        });
        taskReq(`/api/task/${draggedTask.task._id}`, "PUT", { column: toColumn }, draggedTask.task._id);
        draggedTaskRef.current = null;
    };
    // -------------
    console.log('loadingTasks:', loadingTasks)
    return (
        <div className='p-4'>

            <div className='flex justify-end '>
                <TaskFormModal />
            </div>

            {
                loading && <span className='loading loading-dots'></span>
            }

            <div className='grid grid-cols-3 gap-2 my-5'>
                {tasks && Object.keys(tasks).map(col => (
                    <div
                        key={col}
                        className={`${col === 'todo' && 'bg-blue-100'} 
                    ${col === 'inprogress' && 'bg-yellow-100'}
                    ${col === 'done' && 'bg-green-200'}
                    p-4 rounded`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(col)}
                    >
                        <h1 className={`
                            
                            ${col === 'todo' && 'text-blue-400'} 
                    ${col === 'inprogress' && 'text-yellow-400'}
                    ${col === 'done' && 'text-green-400'}
                            text-center font-extrabold text-5xl mb-3`}>{col.toUpperCase()}</h1>

                        {tasks[col].map(task => (
                             
                            <div className="relative my-3">
                               <div className='px-2 flex justify-end'>
                                 <TaskFormModal prebuilt={task} />
                               </div>
                                <div
                                    key={task._id}
                                    draggable={!loadingTasks?.[task._id]}
                                    onDragStart={() => handleDragStart(task, col)}
                                >
                                    <TaskCard task={task} loading={!!loadingTasks?.[task._id]} />
                                </div>


                            </div>

                        ))}
                    </div>
                ))}
            </div>
            <pre className='text-xs tracking-widest'>
                {JSON.stringify(tasks, null, 10)}
            </pre>

            <Kanban />
        </div>
    )
}

export default page
