export function addOne(num: number) {
	if (typeof num !== 'number') {
		throw new Error('num must be of type number.');
	}

	return num + 1;
}