// import Cookies from 'js-cookie';

/**
 * 获取url参数
 * @param key 可选
 * @param url 可选
 */
export const getUrlParams = (key, url) => {
	url = url || window.location.href;
	const params = {};
	url.replace(/([^?&]+)=([^?&]+)/g, (s, v, k) => {
		params[decodeURIComponent(v)] = decodeURIComponent(k);
		return k + '=' + v;
	});
	return (key ? params[key] : params) || '';
};

/**
 * 判断是否微信平台
 * @returns {boolean}
 */
export const isWeiXin = () => /micromessenger/i.test(navigator.userAgent);

/**
 * 判断是否对象
 * @returns {boolean}
 */
export const isObject = (val) => {
	return val !== null && typeof val === 'object' && Array.isArray(val) === false;
};

/**
 * 空对象验证
 * @param obj
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
	if (!obj) return true;
	if (typeof obj !== 'object') return true;
	for (let t in obj) return false;
	return true;
};

/**
 * 去除左右空格
 */
export const trim = (str) => {
	if (!str || typeof str !== 'string') return str;
	return str.replace(/^\s+|\s+$/g, '');
};

/**
 * 空判断
 * @param args
 * @return {boolean}
 */
export const isEmpty = (args) => args === null || args === undefined || args === '';

/**
 * 判断是否数字
 */
export const isNumber = (args) => /^[0-9]*$/.test(trim(args));

/**
 * 转换为number
 */
export const toNumber = (num) => {
	if (typeof num === 'number') return num;
	if (num && /^[0-9].*$/.test(num)) {
		return Number(num);
	}
	return null;
};

/**
 * 设置cookie
 * @param key
 * @param value
 * @param maxTime   过期时间(天)
 * @return {*}
 */
// export const setCookie = (key, value, maxTime) => Cookies.set(key, value, maxTime ? { expires: maxTime } : '');

/**
 * 获取cookie
 * @param key
 * @return {*}
 */
// export const getCookie = (key) => Cookies.get(key);

/**
 * 删除cookie
 * @param name
 */
// export const removeCookie = (name) => {
// 	const cookie = getCookie(name);
// 	if (cookie !== null) {
// 		Cookies.remove(name);
// 	}
// };

/**
 * 删除当前域名下的所有cookie
 */
// export const removeAllCookie = () => {
// 	const keys = document.cookie.match(/[^ =;]+(?==)/g);
// 	if (keys) {
// 		for (let i = keys.length; i--;) {
// 			document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();
// 			document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();
// 		}
// 	}
// };


/**
 * dataURL转换为Blob对象
 * @param dataUrl
 * @returns {Blob}
 */
export const dataURLtoBlob = (dataUrl) => {
	let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bStr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};

/**
 * File/Blob对象转换为dataURL
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
function readBlobAsDataURL (file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}
// 验证手机号
export const testPhone = (resPhone) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (resPhone == "" || resPhone == undefined || resPhone == null || resPhone.length == 0) {
        return 1;
    } else if (!reg.test(resPhone)) {
        return 2;
    } else {
        return 3;
    }
};
/**
 * 文件转base64
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
export const getBase64 = (file) => readBlobAsDataURL(file);

/**
 * 文件转text
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
export function getText (file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsText(file, 'utf8');
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}

/**
 * 文件十六进制转换
 * @param {File|Blob} file
 * @returns {Promise<Array<string>>}
 */
export const getHex = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = () => {
			let u = new Uint8Array(reader.result),
				a = new Array(u.length),
				i = u.length;
			while (i--) // map to hex
				a[i] = (u[i] < 16 ? '0' : '') + u[i].toString(16);
			u = null; // free memory
			resolve(a);
		};
		reader.onerror = error => reject(error);
	});
};

/**
 * 判断是否rar压缩文件
 * 判断文件头 rar的文件头前4个字节为52617221
 * @param {File|Blob} file
 * @returns {Promise<boolean>}
 */
export const checkRar = (file) => {
	return new Promise(async resolve => {
		const hexArray = await getHex(file);
		const res = hexArray?.slice(0, 4);
		resolve(res.join('') === '52617221');
	});
};

/**
 * 将base64转换为文件
 * @param base64     base64字符串
 * @param type       mime类型
 */
export const base64ToBlob = (base64, type) => {
	const arr = base64.split(',');
	const mime = arr[0].match(/:(.*?);/)[1] || type;
	// 去掉url的头，并转化为byte
	const bytes = window.atob(arr[1]);
	// 处理异常,将ascii码小于0的转换为大于0
	const ab = new ArrayBuffer(bytes.length);
	// 生成视图（直接针对内存）：8位无符号整数，长度1个字节
	const ia = new Uint8Array(ab);
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], { type: mime });
};

/**
 * 获取自定义id
 * @param count
 * @returns {string}
 */
export const getCustomId = (count) => {
	count = count || 6;
	let id = '';
	for (let i = 0; i < count; i++) {
		id += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return id;
};

/**
 * 可用于判断是否成功
 * @type {symbol}
 */
export const succeedSymbol = Symbol();

/**
 * 可用于判断是否失败
 * @type {symbol}
 */
export const failedSymbol = Symbol();

/**
 * 使 promise 无论如何都会 resolve，除非传入的参数不是一个Promise对象或返回Promise对象的方法
 * 一般用在 Promise.all 中
 *
 * @param promise 可传Promise对象或返回Promise对象的方法
 * @returns {Promise<any>}
 */
export function alwaysResolve (promise) {
	return new Promise((resolve, reject) => {
		let p = promise;
		if (typeof promise === 'function') {
			p = promise();
		}
		if (p instanceof Promise) {
			p.then(data => {
				resolve({ type: succeedSymbol, data });
			}).catch(error => {
				resolve({ type: failedSymbol, error });
			});
		} else {
			reject('alwaysResolve: 传入的参数不是一个Promise对象或返回Promise对象的方法');
		}
	});
}

/**
 * 防抖函数 (如果一个函数持续地触发，那么只在它结束后过一段时间只执行一次)
 * @param func 传入函数
 * @param wait 表示时间窗口的间隔
 * @param immediate 是否立即触发
 * @return {Function}
 */
export const debounce = (func, wait, immediate) => {
	let timeout;
	return function () {
		/*eslint no-invalid-this: "off"*/
		const self = this;
		// 参数转为数组
		let args = Array.prototype.slice.call(arguments);
		return new Promise(function (resolve) { // 返回一个promise对象
			if (timeout) {
				clearTimeout(timeout);
			}
			if (immediate) {
				const callNow = !timeout;
				timeout = setTimeout(function () {
					timeout = null;
				}, wait);
				if (callNow) {
					resolve(func.apply(self, args)); //值操作
				}
			} else {
				timeout = setTimeout(function () {
					resolve(func.apply(self, args));
				}, wait);
			}
		});
	};
};

/**
 * 节流函数 (如果一个函数持续的，频繁地触发，那么让它在一定的时间间隔后再触发)
 * @param func 传入函数
 * @param wait 表示时间窗口的间隔
 * @return {Function}
 */
export const throttle = (func, wait) => {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		if (!timeout) {
			timeout = setTimeout(function () {
				func.apply(context, args);
				timeout = null;
			}, wait);
		}
	};
};

/**
 * 对象合并
 * @param {Object} source
 * @param {Object} target
 * @param {Array<string>} [exclude=] exclude
 * @returns {Object}
 */
export const extend = (source, target, exclude = []) => {
	for (const prop in source) {
		if (Object.prototype.hasOwnProperty.call(source, prop) && Object.prototype.hasOwnProperty.call(source, prop) && !exclude.includes(prop)) {
			source[prop] = target[prop];
		}
	}
	return source;
};

/**
 * 将当前时间换成时间格式字符串
 * @param time      时间戳
 * @param format    格式
 * @param options   可选项
 * @param options.firstDayOfMonth   获取当月第一天
 * @param options.firstDayOfSeason  获取当季第一天
 * @param options.firstDayOfYear    获取当年第一天
 * @returns {string}
 *
 * 将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 *    (Common.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S") ==> 2018-07-02 08:09:04.423
 *    (Common.formatDate(new Date(), "yyyy-MM-dd E HH:mm:ss") ==> 2018-03-10 二 20:09:04
 *    (Common.formatDate(new Date(), "yyyy-MM-dd EE hh:mm:ss") ==> 2018-03-10 周二 08:09:04
 *    (Common.formatDate(new Date(), "yyyy-MM-dd EEE hh:mm:ss") ==> 2018-03-10 星期二 08:09:04
 *    (Common.formatDate(new Date(), "yyyy-M-d h:m:s.S") ==> 2018-7-2 8:9:4.18
 */
export const formatDate = (time, format = 'yyyy-MM-dd', options) => {
	time = time || new Date();
	let date;
	if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(time)) {
		date = new Date(time);
	} else if (/^[0-9]*$/.test(time)) {
		date = new Date(Number(time));
	} else if (typeof time === 'string' && time.includes(' ') && time.includes('-')) {
		date = new Date(time.replace(/-/g, '/'));
	} else if (typeof time === 'string' && (time.includes('年') || time.includes('月') || time.includes('日'))) {
		date = new Date(time.replace(/[年月日]/g, '/'));
	} else {
		date = new Date(time);
	}
	if (options) {
		// 获取当月第一天
		if (options.firstDayOfMonth) {
			return date.setDate(1) && formatDate(date, format);
		}
		// 获取当季第一天
		if (options.firstDayOfSeason) {
			const month = date.getMonth();
			if (month < 3) {
				date.setMonth(0);
			} else if (month > 2 && month < 6) {
				date.setMonth(3);
			} else if (month > 5 && month < 9) {
				date.setMonth(6);
			} else if (month > 8 && month < 11) {
				date.setMonth(9);
			}
			date.setDate(1);
			return formatDate(date, format);
		}
		// 获取当年第一天
		if (options.firstDayOfYear) {
			return date.setDate(1) && date.setMonth(0) && formatDate(date, format);
		}
		// 获取本周第一天
		if (options.firstWeekOfDay) {
			let weekday = date.getDay() || 7; // 获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
			date.setDate(date.getDate() - weekday + 1);//往前算（weekday-1）天，年份、月份会自动变化
			return formatDate(date, format);
		}
	}
	const dateObj = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), 		// 日
		'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
		'H+': date.getHours(), 	// 小时
		'm+': date.getMinutes(), 	// 分
		's+': date.getSeconds(), 	// 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		'S+': date.getMilliseconds() // 毫秒
	};
	const week = {
		0: '\u65e5',
		1: '\u4e00',
		2: '\u4e8c',
		3: '\u4e09',
		4: '\u56db',
		5: '\u4e94',
		6: '\u516d'
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
	}
	for (const k in dateObj) {
		if (Object.prototype.hasOwnProperty.call(dateObj, k) && new RegExp('(' + k + ')').test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? dateObj[k] : ('00' + dateObj[k]).substr(('' + dateObj[k]).length));
		}
	}
	return format;
};

/**
 * 对象深拷贝
 * @param {Object} obj
 * @returns {null|*}
 */
export const deepCopy = (obj) => {
	if (obj === null) return null;
	let result;
	// 判断是否是简单数据类型
	if (typeof obj === 'object') {
		// 复杂数据类型
		result = obj.constructor === Array ? [] : {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				result[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
			}
		}
	} else {
		// 简单数据类型,直接赋值
		result = obj;
	}
	return result;
};

/**
 * 优雅的处理 async/await
 * @param asyncFunc
 * @return {Promise<*[]>}
 */
export const errorCaptured = async (asyncFunc) => {
	try {
		const res = asyncFunc instanceof Promise ? await asyncFunc : await asyncFunc();
		return [null, res];
	} catch (e) {
		return [e, null];
	}
};

export const isString = str => typeof str === 'string';

/**
 * 判断是否为base64字符串
 * @param {String} str
 */
export const isBase64 = (str) => {
	if (!isString(str)) return false;
	const base64Pattern = '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$';
	if (/^data:image/.test(str)) return true;
	return !!str.match(base64Pattern);
};

/**
 * 中横线(下划线)转换驼峰
 * @param {String} str
 * @returns {*}
 */
export const camelCase = (str) => {
	return str.replace(/([:\-_]+(.))/g, (_, separator, letter, offset) => offset ? letter.toUpperCase() : letter)
		.replace(/^moz([A-Z])/, 'Moz$1');
};

/**
 * 首字母大写
 * @param str
 * @returns {string}
 */
export const firstUpperCase = (str) => str.toString()[0].toUpperCase() + str.toString().slice(1);

/**
 * 驼峰转换下划线
 * @param {String} str
 * @returns {string}
 */
export const camelcaseToHyphen = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * 驼峰转换中横线
 * @param {String} str
 * @returns {string}
 */
export const camelcaseToUnderline = (str) => str.replace(/([a_z])([A_Z])/g, '$1_$2').toLowerCase();

/**
 * 获取浏览器类型
 */
export const getBrowser = () => {
	// 取得浏览器的userAgent字符串
	const userAgent = navigator.userAgent;
	logger.log('userAgent: ', userAgent);

	// 判断是否Opera浏览器
	const isOpera = userAgent.indexOf('Opera') > -1;
	if (isOpera) {
		return 'Opera';
	}

	// 判断是否Firefox浏览器
	if (userAgent.indexOf('Firefox') > -1) {
		return 'Firefox';
	}

	// 判断是否Chrome浏览器
	if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edge') === -1) {
		return 'Chrome';
	}

	// 判断是否Safari浏览器
	if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Edge') === -1) {
		return 'Safari';
	}

	// 判断是否Edge浏览器
	if (userAgent.indexOf('Mozilla') > -1 && userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edge') > -1) {
		return 'Edge';
	}

	// 判断是否IE浏览器
	if ((userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) || (!!window.ActiveXObject || 'ActiveXObject' in window)) {
		return 'IE';
	}
};

/**
 * 获取字符串的长度ascii长度为1 中文长度为2
 * @param str
 * @returns {number}
 */
export const getStrFullLength = (str = '') =>
	str.split('').reduce((pre, cur) => {
		const charCode = cur.charCodeAt(0);
		if (charCode >= 0 && charCode <= 128) {
			return pre + 1;
		}
		return pre + 2;
	}, 0);

/**
 * 给定一个字符串和一个长度,将此字符串按指定长度截取
 * @param str
 * @param maxLength
 * @returns {string}
 */
export const cutStrByFullLength = (str = '', maxLength) => {
	let showLength = 0;
	return str.split('').reduce((pre, cur) => {
		const charCode = cur.charCodeAt(0);
		if (charCode >= 0 && charCode <= 128) {
			showLength += 1;
		} else {
			showLength += 2;
		}
		if (showLength <= maxLength) {
			return pre + cur;
		}
		return pre;
	}, '');
};

/**
 * 触发 window.resize
 */
export const triggerWindowResizeEvent = () => {
	const event = document.createEvent('HTMLEvents');
	event.initEvent('resize', true, true);
	event.eventType = 'message';
	window.dispatchEvent(event);
};

export const welcome = () => {
	const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了'];
	const index = Math.floor((Math.random() * arr.length));
	return arr[index];
};

export const timeFix = () => {
	const time = new Date();
	const hour = time.getHours();
	return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')));
};

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber (...args) {
	// 生成 最小值 到 最大值 区间的随机数
	const random = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};
	if (args.length === 1) {
		let [length] = args;
		// 生成指定长度的随机数字，首位一定不是 0
		let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)));
		return parseInt(nums.join(''));
	} else if (args.length >= 2) {
		let [min, max] = args;
		return random(min, max);
	} else {
		return Number.NaN;
	}
}

/**
 * 随机生成字符串
 * @param {Number} length 字符串的长度
 * @param {String} [chats] chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString (length, chats) {
	if (!length) length = 1;
	if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
	let str = '';
	for (let i = 0; i < length; i++) {
		let num = randomNumber(0, chats.length - 1);
		str += chats[num];
	}
	return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID () {
	let chats = '0123456789abcdef';
	return randomString(32, chats);
}

/**
 * 如果值不存在就 push 进数组，反之不处理
 * @param array 要操作的数据
 * @param value 要添加的值
 * @param key 可空，如果比较的是对象，可能存在地址不一样但值实际上是一样的情况，可以传此字段判断对象中唯一的字段，例如 id。不传则直接比较实际值
 * @returns {boolean} 成功 push 返回 true，不处理返回 false
 */
export function pushIfNotExist (array, value, key) {
	for (let item of array) {
		if (key && (item[key] === value[key])) {
			return false;
		} else if (item === value) {
			return false;
		}
	}
	array.push(value);
	return true;
}

/**
 * 创建一个从 object 中选中的属性的对象。
 * @param {Object} obj
 * @param {Array<String>|String} keys
 * @returns {{}}
 */
export const pick = (obj, ...keys) => {
	if (keys.length === 1 && keys[0] instanceof Array) {
		keys = keys[0];
	}
	const result = {};
	for (const key of keys) {
		result[key] = obj[key];
	}
	return result;
};

/**
 * 删除对象中值为空的属性（null、undefined、''）
 * @param {Object} obj       参数对象
 * @param {Array<*>} includes  包含值属性，一并删除
 * @returns {object}
 */
export const deleteNullAttr = (obj, includes = []) => {
	const newObj = deepCopy(obj);
	for (const propName in newObj) {
		if (newObj.hasOwnProperty(propName)) {
			if (newObj[propName] && newObj[propName] instanceof Object) {
				const values = Object.values(newObj[propName]);
				const results = values.filter(value => isEmpty(value) || includes.includes(value));
				if (!results.length && includes.length) {
					delete newObj[propName];
				} else {
					deleteNullAttr(newObj[propName], includes);
				}
			} else if (isEmpty(newObj[propName])) {
				delete newObj[propName];
			}
		}
	}
	return newObj;
};

/**
 * 判断是否同一天
 * @param {String|number} timeStampA
 * @param {String|number} timeStampB
 * @returns {boolean}
 */
export function isSameDay (timeStampA, timeStampB) {
	const dateA = new Date(timeStampA);
	const dateB = new Date(timeStampB);
	return dateA.setHours(0, 0, 0, 0) === dateB.setHours(0, 0, 0, 0);
}

/**
 * 对象转换为url参数
 * @param {Object} data
 * @returns {string}
 */
export const toUrlString = (data) => {
	const result = [];
	for (let key in data) {
		const value = data[key];
		if (value.constructor === Array) {
			value.forEach(val => result.push(encodeURIComponent(key) + '=' + encodeURIComponent(val)));
		} else {
			result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
		}
	}
	return result.join('&');
};

/**
 * 获取文件名
 * @param {String} str
 * @returns {string}
 */
export const basename = (str = '') => {
	if (!str) return '';
	let idx = str.lastIndexOf('/');
	idx = idx > -1 ? idx : str.lastIndexOf('\\');
	if (idx < 0) {
		return str;
	}
	return str.substring(idx + 1);
};

/**
 * 获取文件扩展名
 * @param {String} filename
 * @returns {string}
 */
export const getFileExtensionName = (filename) => {
	if (!filename) return '';
	// 文件扩展名匹配正则
	const reg = /\.[^.]+$/;
	const matches = reg.exec(filename);
	if (matches) {
		return matches[0] || '';
	}
	return '';
};

/**
 * 字符串转boolean
 * @param boolStr
 * @returns {boolean}
 */
export const toBoolean = boolStr => {
	if (boolStr === 'true') {
		return true;
	}
	if (boolStr === 'false') {
		return false;
	}
	return boolStr;
};

/**
 * 模糊查询格式化
 * @param param
 * @returns {*}
 */
export const fuzzyFormat = (param) => {
	// 模糊查询
	for (let key in param) {
		if (Object.prototype.hasOwnProperty.call(param, key)) {
			if (key.match(/_fuzzy$/)) {
				const innerKey = key.replace(/_fuzzy$/, '');
				if (param[key]) {
					param[innerKey] = '*' + param[key] + '*';
				} else {
					param[innerKey] = param[key];
				}
				delete param[key];
			}
		}
	}
	return param;
};

/**
 * 扁平化数组
 * @param {Array} list
 * @param {string=} pid
 * @returns {[]}
 */
export const flatten = (list, pid = '') => {
	const result = [];
	const flattenHandler = (innerList, innerPid = '') => {
		innerList.forEach(item => {
			item.key = item.id + '_' + innerPid;
			item.pid = innerPid;
			const tempObj = deepCopy(item);
			delete tempObj.children;
			result.push(tempObj);
			if (item.children) {
				flattenHandler(item.children, item.id);
			}
		});
	};
	flattenHandler(list, pid);
	return result;
};

/**
 * 获取静态url地址
 * @param item
 * @returns {*}
 */
export const getStaticUrl = (item) => {
	let filePath = (item.url || item.filePath);
	if (/^https?/.test(filePath)) {
		return filePath;
	}
	if (filePath && isBase64(filePath)) { // 判断当前字符串是否base64地址
		return filePath;
	}
	if (filePath && filePath.startsWith(Config.staticDomainURL)) { // 判断当前字符串是否以 ${ Config.staticDomainURL } 作为开头
		return filePath;
	}
	if (filePath && !filePath.startsWith('/')) { // 判断当前字符串是否以 "/" 作为开头
		filePath = '/' + filePath;
	}
	if (filePath && !filePath.startsWith(Config.staticDomainURL)) { // 判断当前字符串是否以 ${ Config.staticDomainURL } 作为开头
		filePath = Config.staticDomainURL + filePath;
	} else if (!filePath && item.response && item.response.message) {
		filePath = Config.staticDomainURL + '/' + item.response.message;
	}
	return filePath;
};

/**
 * 下载文件
 * @param {string} fileName  文件名
 * @param {string|null} type      文件类型 类型为null时，表示自动识别文件类型
 * @param {File|string} content   文件数据
 */
export const downloadFile = async (fileName, type, content) => {
	let dataUrl = '';
	if (isBase64(content)) {
		dataUrl = content;
	} else {
		if (/https?/.test(content)) {
			content = await loadFile(content);
		}
		// Blob转化为链接
		let blobData = null;
		if (type) {
			blobData = new Blob([content], { type: type || 'application/json;charset=utf-8' });
		} else {
			blobData = new Blob([content]);
		}
		logger.log('getBrowser: ', getBrowser());
		dataUrl = window.URL.createObjectURL(blobData);
		if (window?.navigator.msSaveOrOpenBlob) { // 是Edge浏览器
			window.navigator.msSaveOrOpenBlob(blobData, fileName);
			return;
		}
	}

	if (getBrowser() === 'IE') { // 是IE浏览器
		// 判断是否是base64
		if (isBase64(content) && window.navigator && window.navigator.msSaveOrOpenBlob) { // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片/文件
			const bStr = atob(content.split(',')[1]);
			let n = bStr.length;
			const u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bStr.charCodeAt(n);
			}
			const blob = new Blob([u8arr]);
			window.navigator.msSaveOrOpenBlob(blob, fileName);
		} else {
			// 调用创建iframe的函数
			createIframe(content);
		}
	} else {
		downloadFileByNewWindow(dataUrl, fileName);
	}
};

/**
 * 下载文件(通过新开窗口下载)
 * @param {string} fileUrl  文件地址
 * @param {string} fileName 文件名
 */
export const downloadFileByNewWindow = (fileUrl, fileName) => {
	// 新版浏览器支持download,添加属性
	const aDom = document.createElement('a');
	aDom.setAttribute('href', fileUrl);
	aDom.setAttribute('download', fileName);
	aDom.setAttribute('target', '_blank');
	aDom.setAttribute('display', 'none');
	document.body.appendChild(aDom);
	aDom.click();
	document.body.removeChild(aDom); 		// 下载完成移除元素
	window.URL.revokeObjectURL(fileUrl);	// 释放掉blob对象
};
/**
 * 下载图片/文件的函数
 */
export const openDownload = () => {
	// iframe的src属性不为空,调用execCommand(),保存图片/文件
	const iframeEle = window.document.body.querySelector('#iframeEle');
	if (iframeEle.getAttribute('src') !== 'about:blank') {
		window.frames['iframeEle'].document.execCommand('SaveAs'); // 浏览器是不允许JS跨域操作。在两个页面中加上 document.domain="xxx.com"; 把它指向同一域，就可以操作。
	}
};

/**
 * 创建iframe并赋值的函数,传入参数为图片/文件的src属性值
 * @param data
 */
export const createIframe = (data) => {
	// 如果隐藏的iframe不存在则创建
	let iframeEle = window.document.body.querySelector('#iframeEle');
	if (!iframeEle) {
		iframeEle = window.document.createElement('iframe');
		iframeEle.setAttribute('id', 'iframeEle');
		iframeEle.setAttribute('name', 'iframeEle');
		iframeEle.setAttribute('width', '0');
		iframeEle.setAttribute('height', '0');
		iframeEle.setAttribute('src', 'about:blank');
		iframeEle.addEventListener('load', () => openDownload(), false);
		window.document.body.appendChild(iframeEle);
	}
	// iframe的src属性如不指向图片/文件地址,则手动修改,加载图片/文件
	if (iframeEle.getAttribute('src') !== data) {
		iframeEle.setAttribute('src', data);
	} else {
		// 如指向图片/文件地址,直接调用下载方法
		openDownload();
	}
};

/**
 * 差集
 * @param {Array<string>} list1
 * @param {Array<string>} list2
 * @param {boolean} isList
 * @returns {Array<*>|Set<*>}
 */
export const difference = (list1, list2, isList = true) => {
	const tmpSet = new Set([...list1].filter(x => !list2.includes(x)));
	return isList ? Array.from(tmpSet) : tmpSet;
};

/**
 * 文件大小显示(单位：M)
 * @param size  文件大小
 * @param {string} unit 单位：K、M、AUTO
 * @returns {string}
 */
export const toFileSize = (size, unit = 'AUTO') => {
	const oneK = 1024;
	const oneM = 1024 * 1024;
	unit = unit.toUpperCase();

	const resMap = {};
	resMap.K = () => (size / oneK).toFixed(2) + 'K';
	resMap.M = () => (size / oneM).toFixed(2) + 'M';
	resMap.AUTO = () => {
		if (size > oneM) return resMap.M();
		if (size > oneK && size < oneM) return resMap.K();
		return size + 'B'; // Byte
	};
	return resMap[unit]();
};

/**
 * 复制内容到剪贴板
 * @param {string} content  复制的内容
 * @returns {boolean}
 */
export const copyToClipBoard = (content) => {
	// 动态创建 textarea 标签
	const textarea = document.createElement('textarea');
	// 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
	textarea.readOnly = 'readonly';
	textarea.style.position = 'absolute';
	textarea.style.left = '-9999px';
	// 将要 copy 的值赋给 textarea 标签的 value 属性
	textarea.value = content || '';
	// 将 textarea 插入到 body 中
	document.body.appendChild(textarea);
	// 选中值并复制
	textarea.select();
	textarea.setSelectionRange(0, textarea.value.length);
	const result = document.execCommand('Copy');
	if (result) {
		// message.success('复制成功');
		alert && alert('复制成功');
	}
	document.body.removeChild(textarea);
};

/**
 * 数组去重
 * @param {array} list  数据列表
 * @returns {array} list
 */
export const unique = (list) => {
	const result = [];
	for (const item of list) {
		if (isObject(item) || Array.isArray(item)) {
			const exist = result.some(l => l && JSON.stringify(l) === JSON.stringify(item));
			if (!exist) {
				result.push(item);
			}
		} else {
			if (!result.includes(item)) {
				result.push(item);
			}
		}
	}
	return result;
};

/**
 * 返回顶部
 */
export const goTop = (nativeElement) => {
	const doc = nativeElement || document.documentElement;
	if (doc) {
		const scrollToTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0); // 获取指定元素滚动条的滚动高度
		if (scrollToTop > 0) {
			animation(scrollToTop, 0, 300, 'Linear', value => {
				doc.scrollTop = value;
			});
		}
	}
};
