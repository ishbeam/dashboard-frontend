import { http, BASE } from './api';

const SUPPLIER = BASE + '/supplier'

export function create(account) {
    return http.post(SUPPLIER, account)
}