import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 my-10 mx-4'>
                    <h1 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>Sign Up</h1>
                    <div className='mb-4'>
                        <Label className='block mb-1 font-semibold text-gray-700'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Mukesh Kumar"
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className='mb-4'>
                        <Label className='block mb-1 font-semibold text-gray-700'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="mukesh25@gmail.com"
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block mb-1 font-semibold text-gray-700">Phone Number</Label>
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="8591253408"
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <Label className="block mb-1 font-semibold text-gray-700">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="23Abab#@"
                            required
                            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <RadioGroup className="flex space-x-8">
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="student"
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-5 w-5 text-blue-600 focus:ring-blue-500"
                                    required
                                />
                                <Label htmlFor="student" className="cursor-pointer text-gray-700 font-medium">
                                    Student
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="recruiter"
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-5 w-5 text-blue-600 focus:ring-blue-500"
                                    required
                                />
                                <Label htmlFor="recruiter" className="cursor-pointer text-gray-700 font-medium">
                                    Recruiter
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="mb-6">
                        <Label className="block mb-2 font-semibold text-gray-700 cursor-pointer">Profile Photo</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            name="profilePhoto"
                            onChange={changeFileHandler}
                            className="w-full cursor-pointer border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={!input.email || !input.password || !input.role || loading}
                        className={`w-full py-3 text-white font-semibold rounded-md transition
                  ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                `}
                    >
                        {loading ? <><Loader2 className="inline-block mr-2 animate-spin" size={18} />Please wait...</> : "Signup"}
                    </Button>

                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                            login
                        </Link>
                    </p>
                </form>
            </div>
        </div>

    );
};
export default Signup;









// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Signup = () => {

//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     });
//     const {loading,user} = useSelector(store=>store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();    //formdata object
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': "multipart/form-data" },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             dispatch(setLoading(false));
//         }
//     }

//     useEffect(()=>{
//         if(user){
//             navigate("/");
//         }
//     },[])
//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
//                     <div className='my-2'>
//                         <Label>Full Name</Label>
//                         <Input
//                             type="text"
//                             value={input.fullname}
//                             name="fullname"
//                             onChange={changeEventHandler}
//                             placeholder="patel"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="patel@gmail.com"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Phone Number</Label>
//                         <Input
//                             type="text"
//                             value={input.phoneNumber}
//                             name="phoneNumber"
//                             onChange={changeEventHandler}
//                             placeholder="8080808080"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="patel@gmail.com"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={input.role === 'student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r1">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     checked={input.role === 'recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 onChange={changeFileHandler}
//                                 className="cursor-pointer"
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
//                     }
//                     <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup