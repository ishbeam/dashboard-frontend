import { http } from './api';

const OPIS = '/opis';

export function get() {
    return http.get(OPIS)
}