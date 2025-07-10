import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'


const AdminJobs = () => {
    useGetAllAdminJobs()
    const [input, setInput] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://wallpapercave.com/wp/wp8656097.jpg')`,
            }}
        >
            <Navbar />
            <div className='flex justify-center px-4'>
                <div className='bg-white/80 backdrop-blur-md mt-10 max-w-6xl w-full rounded-xl p-6 shadow-lg'>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <Input
                            className="w-full md:w-[300px]"
                            placeholder="Filter by name, role"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/jobs/create")}>New Jobs</Button>
                    </div>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs