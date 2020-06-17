export { debounce, throttle } from "lodash";

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

// 补零
export function pad(num, n = 2) {
	let len = num.toString().length;

	while (len < n) {
		num = "0" + num;
		len++;
	}
	return num;
}

export function getPageOffset(page, limit) {
	return (page - 1) * limit;
}

export function unique(arr, key = "id") {
	let uniqueArr = [];
	arr.forEach(item => {
		const result = uniqueArr.findIndex(uniq => uniq[key] === item[key]);

		if (result === -1) {
			uniqueArr.push(item);
		}
	});

	return uniqueArr;
}

export function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
	date = date instanceof Date ? date : new Date(date);
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + "";
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
		}
	}
	return fmt;
}

function padLeftZero(str) {
	return ("00" + str).substr(str.length);
}

export function formatTime(interval) {
	interval = interval | 0;
	const minute = pad((interval / 60) | 0);
	const second = pad(interval % 60);
	return `${minute}:${second}`;
}

export function scrollInto(dom) {
	dom.scrollIntoView({ behavior: "smooth" });
}
