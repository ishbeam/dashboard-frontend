import { http, BASE, serialize } from './api';

const USER = BASE + '/user';


const SIGNUP = BASE + '/signup';

const INVITE = '/user/invite'


export function getUser(userId) {
    
}

export function signup(email, password, type) {
    const data = {
        email, password, type
    }

    return http.post(SIGNUP, data)
}

export function find(query) {
    const params = serialize(query)

    return http.get(USER + '?' + params)
}

export function invite(user) {
    return http.post(INVITE, user)
}