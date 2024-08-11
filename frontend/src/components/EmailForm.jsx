import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = ({ setShowOtpForm, setEmail }) => {
    const [emailInput, setEmailInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/otp/send-otp', { email: emailInput });
            setEmail(emailInput);
            setShowOtpForm(true);
        } catch (error) {
            alert('Error sending OTP');
        }
    };

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-3"></div>
                    <div className="col-lg-4 col-sm-12 col-md-6">

                        <form onSubmit={handleSubmit} >
                            <label>Email:</label>
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                required placeholder='Enter Your Email'
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmailForm;
