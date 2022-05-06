// @ts-check
const isValidEmail = (/** @type {string} */ email) => {
	if (!email || email.length === 0 || email.length > 254) {
		return false;
	}

	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
	if (!regex.test(email)) {
		return false;
	}

	return true;
}

export { isValidEmail };