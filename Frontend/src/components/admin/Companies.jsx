import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {
    useGetAllCompanies()
    const [input, setInput] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(setSearchCompanyByText(input))
    },[input])
    
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://wallpapercave.com/wp/wp8656097.jpg')`,
            }}
        >
            <Navbar />
            <div className="flex justify-center px-4">
                <div className="bg-white/80 backdrop-blur-md mt-10 max-w-6xl w-full rounded-xl p-6 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                        <Input
                            className="w-full md:w-[300px]"
                            placeholder="Filter by name"
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <Button onClick={() => navigate("/admin/companies/create")}>
                            New Company
                        </Button>
                    </div>
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies




//         <div>
//             <Navbar />
//             <div className='max-w-6xl mx-auto my-10'>
//                 <div className='flex items-center justify-between my-5'>
//                     <Input
//                         className="w-fit"
//                         placeholder="Filter by name"
//                         onChange={(e) => setInput(e.target.value)}
//                     />
//                     <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
//                 </div>
//                 <CompaniesTable/>
//             </div>
//         </div>
//     )
// }

// export default Companies
