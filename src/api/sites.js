import { http } from './api';

const SITE = '/site'

export function list() {
    return http.get(SITE)
}

export function create(site) {
    return http.post(SITE, site)
}