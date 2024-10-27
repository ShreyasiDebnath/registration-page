// SignUp.js
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const[error,setError] = useState(null)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email,password)
        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);
            setError(null); 
            navigate('/dashboard'); 
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Login failed';
            setError(errorMsg);
        }
    };

    return (
        <div className="flex items-center justify-center   p-4 m-2 h-[80vh]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
                <h4 className="font-bold mb-6 text-center text-black">Welcome back to ECOMMERCE</h4>
                <h6 className=" mb-6 text-center text-black">The next gen business marketplace</h6>
                 {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4 relative">
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <div className="flex items-center relative ">
                        <input
                            type={isPasswordVisible ? "text" : "password"} 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="flex-grow h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)} visibility
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 ml-2 text-black hover:text-slate-700"
                        >
                            {isPasswordVisible ? (
                                <EyeOffIcon className="h-6 w-6" /> 
                            ) : (
                                <EyeIcon className="h-6 w-6" /> 
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full h-10 bg-black hover:bg-slate-800 text-white font-bold rounded-md transition duration-300"
                >
                    Log In
                </button>

                <p className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-black hover:text-slate-700">SIGN UP</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
