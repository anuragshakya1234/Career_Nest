import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


//const randomJobs = [1, 2, 3, 4, 5, 6]

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return () => {
            dispatch(setSearchedQuery(""))
        }
    },[])
    return (
        <div  style={{
      backgroundImage:"url('https://assets.isu.pub/document-structure/230528170811-ae92d7a5a0beffa5ca3d5c2e051d2dea/v1/1ba74b686c78beae72510bdabe6ffd50.jpeg')", backgroundSize: "cover", backgroundPosition: "center",
    }}>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse