import React, { useState } from 'react';
import { Input } from 'baseui/input';

import { updatePassword } from '../../api/accounts';

const ResetPassword = (props) => {
    const [pw, setPW] = useState('')

    function onUpdate() {
        updatePassword(pw, props.token).then(() => {
            window.location = '/login';
        }).catch(e => console.log(e))
    }

    return(
        <div className="container--sm">
            <h1>Reset Password</h1>
            <div className="grid1of1 mb-1">
                <Input 
                    value={pw}
                    placeholder='New Password'
                    type='password'
                    onChange={(e) => setPW(e.target.value)}
                />
            </div>

            <button className="primary" onClick={onUpdate}>Submit</button>
        </div>
    )
}

export default ResetPassword;