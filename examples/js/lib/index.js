// @ts-check
function emailValidation({ to, from, body, subject }) {
	if (!to) {
		throw Error('"to" is required.');
	}

	if (!from) {
		throw Error('"from" is required.');
	}

	if (!body) {
		throw Error('"body" is required.');
	}

	if (typeof to !== "string") {
		throw Error('"to" is not of type String.')
	}

	if (typeof from !== "string") {
		throw Error('"from" is not of type String.')
	}

	if (typeof body !== "string") {
		throw Error('"body" is not of type String.')
	}

	if (!isValidEmail(to)) {
		throw Error('"to" is not a valid email address.')
	}

	if (!isValidEmail(from)) {
		throw Error('"from" is not a valid email address.')
	}

	if (subject && typeof subject !== "string") {
		throw Error('"subject" is not of type String.')
	}

	return true;
}

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

module.exports = { emailValidation, isValidEmail }