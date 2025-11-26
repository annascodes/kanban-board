'use client'
import React, { useEffect } from 'react'
import TaskForm from './TaskForm'
import useApiReq from '@/lib/hooks/useApiReq'
import { LuPencil } from 'react-icons/lu'
import { useFormState } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'


const TaskFormModal = ({ id = 'newTask', prebuilt = null, handleTasksAfterUpdatingTask = null, handleTasksAfterAddingNewTask = null }) => {
    const modalId = `${id}-taskformmodal`

    const { request, data, loading, err } = useApiReq()
    const { request: updReq, data: updData, loading: updLoading, err: updErr } = useApiReq()
    const handlePostNewTask = (newTask) => {
        // console.log('new task: ', newTask)
        request('/api/task', 'POST', newTask)

    }
    const handleOnUpdate = (task) => {
        // console.log('new task: ', task)

        updReq(`/api/task/${task.id}`, 'PUT', task)


    }


    useEffect(() => {
        if (data && handleTasksAfterAddingNewTask) {
            handleTasksAfterAddingNewTask(data)
            toast.success('Task created.')

        }
        if (err) {
            toast.error(err.error)
        }
    }, [data, err])
    useEffect(() => {
        if (updData && handleTasksAfterUpdatingTask) {
            handleTasksAfterUpdatingTask(updData)
            toast.success('Task updated.')

        }
        if (updErr) {
            toast.error(updErr.error)
        }
    }, [updData, updErr])

    // handleTasksAfterDeletingTask


    return (
        <div>

            <button className={prebuilt ? `btn btn-outline btn-neutral text-black rounded-b-none btn-xs bg-white border-none` : `btn btn-outline btn-neutral tracking-widest text-xs`}
                onClick={() => {
                    // handlePrebuilt()
                    document.getElementById(modalId).showModal()
                }}>
                {
                    prebuilt ? <LuPencil className='text-sm' /> : '  Create task'

                }

            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">

                    {
                        loading && <span className='loading loading-dots'></span>
                    }
                    {
                        updLoading && <div className='flex items-center gap-2 text-xs tracking-widest opacity-40'> <span>updating</span> <span className='loading loading-dots'></span></div>
                    }

                    <TaskForm key={id} onSubmit={handlePostNewTask} prebuilt={prebuilt} onUpdate={handleOnUpdate} />
                    {/* <pre className='text-xs text-red-500'>
                        {JSON.stringify(err, null, 10)}
                    </pre> */}
                    <Toaster

                        toastOptions={{
                          
                            duration: 3000
                        }}
                    />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default TaskFormModal
