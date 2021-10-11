import { http } from './api';

const TERMINAL = '/terminal'

export function list() {
    return http.get(TERMINAL)
}

export function create(terminal) {
    return http.post(TERMINAL, terminal)
}