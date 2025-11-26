'use client'
import useApiReq from '@/lib/hooks/useApiReq';
import React, { useEffect } from 'react'
import { LuTrash2 } from "react-icons/lu";
const DeleteModal = ({ task, handleTasksAfterDeletingTask = null }) => {
    const modalId = `deleteModal- ${task._id} `
    const { request, data, loading, err } = useApiReq()

    const handleDeleteIt = () => {
        request(`/api/task/${task._id}`, 'DELETE', task._id)
    }

    useEffect(() => {
        if (data && handleTasksAfterDeletingTask) {
            handleTasksAfterDeletingTask(task._id)
        }
    }, [data])


    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
                className={`btn btn-outline btn-neutral text-black rounded-b-0 btn-xs rounded-b-none bg-white border-none`}
                onClick={() => document.getElementById(modalId).showModal()}>
                {loading
                    ? <span className='loading loading-dots loading-xs'></span>
                    : <LuTrash2 className='text-lg' />
                }


            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Do you want to delete this?</h3>
                    <p className="py-4">{task.title}</p>
                    <div className="modal-action">
                        <form method="dialog" className='w-full flex justify-between items-center'>
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleDeleteIt} className="btn btn-error ">Yes, delete it.</button>
                            <button className="btn">No</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DeleteModal
