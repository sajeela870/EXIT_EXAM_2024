import React, { useState } from 'react';
import './App.css';
import EmailForm from './components/EmailForm';
import OTPForm from './components/OTPForm';
import Welcome from './components/Welcome';


const App = () => {
    const [email, setEmail] = useState('');
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    return (
        <div>
            {!showOtpForm && !isVerified && (
                <EmailForm 
                    setShowOtpForm={setShowOtpForm} 
                    setEmail={setEmail} 
                />
            )}
            {showOtpForm && !isVerified && (
                <OTPForm 
                    email={email} 
                    setIsVerified={setIsVerified} 
                />
            )}
            {isVerified && <Welcome />}
        </div>
    );
};

export default App;
