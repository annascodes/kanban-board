'use client'
import React from 'react'
import TaskForm from './TaskForm'
import useApiReq from '@/lib/hooks/useApiReq'
import { LuPencil } from 'react-icons/lu'

const TaskFormModal = ({ prebuilt = null }) => {

    const { request, data, loading, err } = useApiReq()
    const handlePostNewTask = (newTask) => {
        console.log('new task: ', newTask)
        request('/api/task', 'POST', newTask)

    }

    return (
        <div>
            
            <button className={prebuilt ? `btn btn-outline btn-neutral text-black rounded-b-0 btn-xs bg-white border-none` : `btn btn-outline btn-neutral tracking-widest text-xs`}
                onClick={() => document.getElementById('my_modal_2').showModal()}>
                {
                    prebuilt ? <LuPencil className='text-sm'/> : '  Create task'
                    
                }
              
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    {
                        loading && <span className='loading loading-dots'></span>
                    }
                    <TaskForm onSubmit={handlePostNewTask} prebuilt />
                    <pre>
                        {JSON.stringify(data, null, 10)}
                    </pre>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default TaskFormModal
