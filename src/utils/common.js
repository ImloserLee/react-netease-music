export { debounce, throttle } from 'lodash';

export function isDef(v) {
    return v !== undefined && v !== null;
}

export function isEmptyObj(v) {
    return Object.keys(v).length === 0;
}

export function formatNumber(number) {
    number = Number(number) || 0;
    return number > 100000 ? `${Math.round(number / 10000)}万` : number;
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

export function unique(arr, key = 'id') {
    let uniqueArr = [];
    arr.forEach(item => {
        const result = uniqueArr.findIndex(uniq => uniq[key] === item[key]);

        if (result === -1) {
            uniqueArr.push(item);
        }
    });

    return uniqueArr;
}
