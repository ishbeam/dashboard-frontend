import { http } from './api';

const PAYMENTS = '/payment'

const PAY = PAYMENTS + '/pay';

const STATUS = PAYMENTS + '/status';

export function pay(orderId) {
    const data = {
        orderId
    }

    return http.post(PAY, data)
}

export function getStatus(orderId) {
    return http.get(STATUS + '/' + orderId)
}
