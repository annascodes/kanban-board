import { useState } from "react";

const useApiReqTask = () => {
    const [loadingTasks, setLoadingTasks] = useState({}); // { taskId: boolean }
    const [errorTasks, setErrorTasks] = useState({});     // { taskId: error }
    const [dataTasks, setDataTasks] = useState({});       // { taskId: data }

    
    const request = async (url, method = "GET", body = null, taskId = null) => {
        console.log('task id in req: ', taskId) // this is not showing on console/inbrowers
        if (taskId){
            console.log('hahahahahahhahaha')
             setLoadingTasks((prev) => ({ ...prev, [taskId]: true }))
        };
        try {
            const res = await fetch(url, {
                method,
                headers: body ? { "Content-Type": "application/json" } : undefined,
                body: body ? JSON.stringify(body) : undefined,
            });

            const result = await res.json();

            if (!res.ok) {
                if (taskId) setErrorTasks((prev) => ({ ...prev, [taskId]: result }));
                else console.error(result);
                return null;
            } else {
                if (taskId) setDataTasks((prev) => ({ ...prev, [taskId]: result }));
                return result;
            }
        } catch (error) {
            if (taskId) setErrorTasks((prev) => ({ ...prev, [taskId]: error }));
            else console.error(error);
            return null;
        } finally {
            if (taskId) setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
        }
    };

    return { request, loadingTasks, errorTasks, dataTasks };
};

export default useApiReqTask;
