import { BASE, http } from './api';

const URL = '/order'

const BIDS = URL + '/bid';
const OPEN = URL + '/open';



export async function create(data) {
    return http.post(URL, data)
}

export async function getOne(orderId) {
    return http.get(URL + `/${orderId}`)
}

/**
 * Gets the users orders by either Active or Fulfilled
 */
export async function get(type) {
    return http.get(URL + `?type=${type}`)
}

export async function setDriver(orderId, driver) {
    const data = {
        driver: driver
    }
    return http.put(URL + `/${orderId}`, data)
}

/**
 * Gets orders that are open for bidding
 * @supplier
 */
export async function getOrdersForBid() {
    return http.get(BIDS)
}

export async function submitBid(orderId, terminal, products) {
    const data = {
        products,
        pickup: terminal
    }
    return http.post(URL + `/${orderId}/bid`, data)
}

export async function hasBidAlready(orderId, supplierId) {
    const data = {
        orderId,
        supplierId
    }
    return http.get(BIDS + data)
}

export async function listOpen() {
    return http.get(OPEN)
}