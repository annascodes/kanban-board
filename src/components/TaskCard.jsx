import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiBatteryHigh, PiBatteryLow, PiBatteryMedium } from "react-icons/pi";
import { LuBatteryFull, LuBatteryLow, LuBatteryMedium, LuPencil } from "react-icons/lu";
import moment from 'moment';
import { SlCalender } from "react-icons/sl";
import { LuCalendarRange } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";
import TaskFormModal from './TaskFormModal';


const TaskCard = ({ task = null, loading = false }) => {
    
    return (
        <div>
            <div className="card bg-base-100 max-w-96 shadow-xl border-0 border-stone-300 p-0">

                <div className="card-body border-0 p-2 gap-0 ">
                  

                    <div className='flex justify-between mb-2 text-xs tracking-widest items-center gap-3'>
                        <div className='flex items-center gap-2 opacity-30'>
                            <LuCalendarClock className='text-lg' />
                            <span
                                className={`${moment(task.dueDate).fromNow().includes('ago') && 'text-red-500 line-through'}`}
                            >

                                {moment(task.dueDate).format(' Do MMM YYYY')}

                            </span>

                        </div>
                        {loading && (
                            <span className="loading loading-dots loading-xs "></span>
                        )}
                        <div className='flex items-center gap-3'>
                            {
                                task.priority === 'low' && <LuBatteryLow className='text-blue-500 text-2xl' />

                            }
                            {
                                task.priority === 'medium' && <LuBatteryMedium className='text-yellow-500 text-2xl' />
                            }
                            {
                                task.priority === 'high' && <LuBatteryFull className='text-red-500 text-2xl' />
                            }
                             
                        </div>
                    </div>

                    {/* ____________ */}
                    <details key={task._id} className="collapse bg-base-100 border-0 border-base-300" name="my-accordion-det-1" open>
                        <summary className="collapse-title p-0 flex justify-between border-0">
                            <h2 className="card-title border-0 underline underline-offset-4">


                                {task.title}

                            </h2>


                        </summary>
                        <div className="collapse-content ">
                            <p className='whitespace-pre-wrap'>{task.description}</p>

                            <div className="card-actions justify-end">
                                {
                                    task.tags.map(tag => (
                                        <div className="badge badge-outline">{tag}</div>

                                    ))
                                }

                            </div>
                        </div>
                    </details>

                   
                </div>
            </div>
        </div>
    )
}

export default TaskCard
