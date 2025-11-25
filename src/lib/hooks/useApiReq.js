import React, { useState } from 'react'

const useApiReq = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [err, setErr] = useState(null);

    const request = async (url, method = 'GET', body = null) => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                headers: body ? {'Content-Type': 'application/json'}: undefined,
                body: body ? JSON.stringify(body) : undefined
            })

            const result = await res.json()
            if(!res.ok){
                setData(null)
                setErr(result)
            }else{
                setData(result)
                setErr(null)
            }
            
        } catch (error) {
            setData(null)
            setErr(error)
        }finally{
            setLoading(false)
        }
    }
    return {request, data, loading, err}
}

export default useApiReq
