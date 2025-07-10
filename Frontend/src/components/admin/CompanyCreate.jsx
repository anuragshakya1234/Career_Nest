import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
         <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://img.freepik.com/premium-photo/aidriven-data-mining-synergizing-technology-insights-innovation_985046-7871.jpg')`,
            }}
        >
            <Navbar />
            <div className="flex justify-center items-center min-h-[90vh] px-4">
                <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-10 max-w-xl w-full">
                    <div className="mb-6">
                        <h1 className="font-bold text-2xl text-gray-800">Your Company Name</h1>
                        <p className="text-gray-600">What would you like to give your company name? You can change this later.</p>
                    </div>
                    <Label className="text-gray-700">Company Name</Label>
                    <Input
                        type='text'
                        className='my-2'
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e)=> setCompanyName(e.target.value)}
                    />
                    <div className='flex items-center gap-2 my-6'>
                        <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                        <Button onClick={registerNewCompany}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
        //  <div
        //     className="min-h-screen bg-cover bg-center bg-no-repeat"
        //     style={{
        //         backgroundImage: `url('https://images.unsplash.com/photo-1605902711622-cfb43c4437b2?auto=format&fit=crop&w=1950&q=80')`,
        //     }}
        // >
        //     <Navbar />
        //     <div className='max-w-4xl mx-auto'>
        //         <div className='my-10'> 
        //             <h1 className='font-bold text-2xl'>Your Company Name</h1>
        //             <p className='text-gray-500'>What would you like to give your company name? you can change this later.</p>
        //         </div>
        //         <Label>Company Name</Label>
        //         <Input
        //             type='text'
        //             className='my-2'
        //             placeholder="JobHunt, Microsoft etc."
        //             onChange={(e)=> setCompanyName(e.target.value)}
        //         />
        //         <div className='flex items-center gap-2 my-10'>
        //             <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
        //             <Button onClick={registerNewCompany}>Continue</Button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CompanyCreate
