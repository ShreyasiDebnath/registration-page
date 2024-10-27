import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // to track OTP sent status
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('auth/signup', {
                name: username,
                email,
                password,
            });

            if (response.data === 'OTP sent to your email!') {
                setOtpSent(true); 
                navigate('/verify', { state: { email } });
            }
        } catch (err) {
            setError('Error signing up. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center p-4 m-2 h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Create Your Account</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full h-10 border border-gray-300 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

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
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
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

                <button
                    type="submit"
                    className="w-full h-10 bg-black hover:bg-slate-800 text-white font-bold rounded-md transition duration-300"
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-black hover:text-slate-700">LOG IN</a>
                </p>
            </form>

           
        </div>
    );
};

export default Signup;
