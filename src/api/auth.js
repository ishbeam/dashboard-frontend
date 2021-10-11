import { http, BASE } from './api';
import axios from 'axios';

const LOGIN = BASE + '/login'
const SIGNUP = BASE + '/sign-up';
const AUTHENTICATE = '/authenticate'


export function login(email, password) {
    // btoa base64 encodes it
    // const encodedCredentials = btoa(`${email}:${password}`);
    const data = {
        email, password
    }
    
    
    // const headers = {
    //     headers: {
    //         Authorization: `Basic ${encodedCredentials}`
    //     }
    // }

    // return http.put(LOGIN, headers)
    return http.post(LOGIN, data)
}

export function logout() {
    
}

export function signup(name, email) {
    const data = {
        name,
        email,
        password: 'abc123',
        confirmed: true
    }
    return http.post(SIGNUP, data)
}

// THIS IS BROKE RN
export function authenticate() {
    return http.get(AUTHENTICATE)
}