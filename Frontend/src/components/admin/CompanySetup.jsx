import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false)
   
    const navigate = useNavigate()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(input);
        const formData = new FormData();
        formData.append("name",input.name);
        formData.append("description", input.description);
        formData.append("website",input.website);
        formData.append("location",input.location);
        if(input.file){
            formData.append("file",input.file)
        }
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}` , formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true
            });
            if(res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=>{
        setInput({
            name:singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file : singleCompany.file || null
        })
    },[singleCompany]);
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('https://www.thegoldenmoon.com/blog/wp-content/uploads/2018/12/Screenshot-2018-12-07-at-18.04.39.png')`,
            }}
        >
            <Navbar />
            <div className='flex justify-center px-4'>
                <form onSubmit={submitHandler}  className="bg-white/90 backdrop-blur-md max-w-3xl w-full rounded-xl shadow-xl mt-10 p-6">
                    <div className='flex items-center gap-5 mb-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-2xl text-gray-800"'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="e.g., Google"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="e.g., Search Engine"
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="e.g., California, USA"
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className='w-full mt-8'>Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
