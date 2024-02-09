export const bigintToNumber = (obj: any) => {
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'bigint') {
			obj[key] = Number(obj[key]);
		}
	});
	return obj;
}

export const numberToBigint = (obj: any) => {
	Object.keys(obj).forEach((key) => {
		if (typeof obj[key] === 'number') {
			obj[key] = BigInt(obj[key]);
		}
	});
	return obj;
}