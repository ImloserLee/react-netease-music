export { debounce, throttle } from 'lodash';

export function isDef(v) {
    return v !== undefined && v !== null;
}

export function isEmptyObj(v) {
    return Object.keys(v).length === 0;
}

export function pad(num, n = 2) {
    let len = num.toString().length;

    while (len < n) {
        num = '0' + num;
        len++;
    }
    return num;
}

export function getPageOffset(page, limit) {
    return (page - 1) * limit;
}
