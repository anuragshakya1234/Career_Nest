import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/")
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const message = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(message);
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
                    <h1 className='text-3xl font-extrabold text-gray-900 mb-8 text-center'>Login</h1>
                    <div className='mb-6'>
                        <Label className='block text-gray-700 font-semibold mb-2'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="mukesh25@gmail.com"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div className='mb-6'>
                        <Label className='block text-gray-700 font-semibold mb-2'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="23Abab#@"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className='mb-6'>
                        <RadioGroup className="flex space-x-8">
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="r1"
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-5 w-5 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="r1" className="cursor-pointer text-gray-700 font-medium">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="r2"
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer h-5 w-5 text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor="r2" className="cursor-pointer text-gray-700 font-medium">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button
                        type="submit"
                        disabled={!input.email || !input.password || !input.role || loading}
                        className={`w-full py-3 text-white font-semibold rounded-md transition
      ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
    `}
                    >
                        {loading ? <><Loader2 className="inline-block mr-2 animate-spin" size={18} />Please wait...</> : "Login"}
                    </Button>

                    <p className="mt-6 text-center text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
                            Signup
                        </Link>
                    </p>

                    {/* {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span> */}
                </form>
            </div>
        </div>
    )
}

export default Login;








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
// import { setLoading, setUser } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Login = () => {
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//         role: "",
//     });
//     const { loading,user } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
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
//                     <h1 className='font-bold text-xl mb-5'>Login</h1>
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
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
//                     }
//                     <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login