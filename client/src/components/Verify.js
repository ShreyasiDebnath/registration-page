import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Verify() {
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = useState(Array(8).fill('')); // 8 empty values for each digit
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleOtpChange = (e, index) => {
        const { value } = e.target;
        if (/^\d*$/.test(value)) { 
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

        
            if (value && index < otp.length - 1) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');
        
        if (otpCode.length === 8) {
            try {
                // Replace with your actual verification API endpoint
                const response = await axios.post('http://localhost:80/api/auth/verify-otp', { email, otp: otpCode });
                alert(response.data.message || 'OTP verified successfully');
                navigate('/login'); 
            } catch (err) {
                setError('Invalid OTP. Please try again.');
            }
        } else {
            setError('Please enter the complete 8-digit OTP.');
        }
    };

    return (
        <div className='flex items-center justify-center p-4 m-2 h-[80vh]'>
            <form onSubmit={handleSubmit} className='border-slate-200 border-2 rounded-md w-fit p-4 flex flex-col items-center'>
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Verify your email</h2>
                <h6 className="text-center text-black">Enter the 8-digit code you have received on</h6>
                <h4 className="font-bold mb-6 text-center text-black">{email}</h4>
                
                <div className='w-full flex justify-start m-2'><span className='mx-2'>Code</span></div>
                
                <div>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            id={`otp-input-${index}`}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength={1}
                            className="w-8 h-8 mx-1 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}

                <button
                    type="submit"
                    className="my-8 h-10 w-3/4 bg-black hover:bg-slate-800 text-white font-bold rounded-md transition duration-300"
                >
                    Verify
                </button>
            </form>
        </div>
    );
}

export default Verify;
