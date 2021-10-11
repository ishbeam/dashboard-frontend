import { http, BASE } from './api';

const RETAILER = BASE + '/retailer'

export function create(account) {
    return http.post(RETAILER, account)
}