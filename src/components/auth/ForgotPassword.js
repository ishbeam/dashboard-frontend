import React, { useState } from 'react';
import { Input } from 'baseui/input';

import { forgotPassword } from '../../api/accounts';

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState({ error: false, message: '' })

    function onReset() {
        forgotPassword(email).then(() => {
            alert('Check your email for instructions!')
            window.location = '/login';
        }).catch(e => console.log(e))
    }

    return(
        <div className="container--sm">
            <h1>Forgot Password</h1>
            <div className="grid1of1 mb-1">
                <Input 
                    value={email}
                    placeholder='Email'
                    type='none'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {error.error && error.message}

            <button className="primary" onClick={onReset}>Reset</button>
        </div>
    )
}

export default ForgotPassword;