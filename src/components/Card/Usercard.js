import { useQuery } from '@tanstack/react-query'
import React from 'react'
import api from '../Hooks/instance'

const Usercard = ({ usr }) => {
    const { isLoading, data: messages } = useQuery(['All Messages', usr], () =>
        api.get(`/messages/${usr?.email}`)
            .then(res => res.data)
    )
    if (isLoading) {
        return <button className='btn btn-secondary loading w-full mt-2'></button>
    }
    return (
        <div className="relative flex flex-row items-center p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                {usr?.name?.slice(0, 1)}
            </div>
            <div className="flex flex-col flex-grow ml-3">
                <div className="text-sm  font-medium">{usr?.name}</div>
                <div className="text-xs truncate w-40">{messages[0]?.message}</div>
            </div>
        </div>
    )
}

export default Usercard