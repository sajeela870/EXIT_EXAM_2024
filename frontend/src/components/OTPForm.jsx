import React, { useState } from 'react';
import axios from 'axios';

const OTPForm = ({ email, setIsVerified }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/otp/verify-otp', { email, otp });
            if (response.data.message === 'OTP verified') {
                setIsVerified(true);
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            alert('Error verifying OTP');
        }
    };

    return (
        <section>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-3"></div>
                <div className="col-lg-4 col-sm-12 col-md-6">
        <form onSubmit={handleSubmit}>
            <label>Enter OTP:</label>
            <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
            />
            <button type="submit">Submit</button>
        </form>
        </div>
                </div>
            </div>
        </section>

    );
};

export default OTPForm;
