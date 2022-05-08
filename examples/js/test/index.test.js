// @ts-check
const { strictEqual } = require('assert');
const { testArray } = require('@wellers/testarray');
const { emailValidation, isValidEmail } = require('../lib/index.js');
	
const tests = [
	{
		name: 'should return true when "email" contains multiple periods before the @ symbol',
		args: {
			query: () => isValidEmail("this.is.a@test.com"),
			result: true
		}
	},
	{
		name: 'should return true when "email" contains multiple periods after the @ symbol',
		args: {
			query: () => isValidEmail("thisisa@test.co.uk"),
			result: true
		}
	},
	{
		name: 'should return true when "email" contains special characters',
		args: {
			query: () => isValidEmail("/#!$%&'*+-/=?^_`{}|~@test.com"),
			result: true
		}
	},
	{
		name: 'should return true when "email" contains special characters #2',
		args: {
			query: () => isValidEmail("\"()<>[]:,;@\"!#$%&'-/=?^_`{}| ~.a\"@test.com"),
			result: true
		}
	},
	{
		name: 'should return false when "email" is not defined',
		args: {
			query: () => isValidEmail(),
			result: false
		}
	},
	{
		name: 'should return false when "email" is an empty String',
		args: {
			query: () => isValidEmail(""),
			result: false
		}
	},
	{
		name: 'should return false when "email" is too long for an email address',
		args: {
			query: () => isValidEmail("1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x@example.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" does not contain @',
		args: {
			query: () => isValidEmail("thisisatest.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains multiple @ symbols',
		args: {
			query: () => isValidEmail("this@is@atest.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains sequential periods before the @ symbol',
		args: {
			query: () => isValidEmail("this..isa@test.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains sequential periods after the @ symbol',
		args: {
			query: () => isValidEmail("thisisa@test..com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains whitespace',
		args:
		{
			query: () => isValidEmail("this isa@test.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" has leading whitespace',
		args: {
			query: () => isValidEmail(" thisisa@test.com"),
			result: false
		}
	},
	{
		name: 'should return false when "email" has trailing whitespace',
		args: {
			query: () => isValidEmail("thisisa@test.com "),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains speechmarks that are not escaped',
		args: {
			query: () => isValidEmail('this"is"a@test.com'),
			result: false
		}
	},
	{
		name: 'should return false when "email" contains escaped speechmarks',
		args: {
			query: () => isValidEmail('this"is"a@test.com'),
			result: false
		}
	},
	{
		name: 'should return true when all required properties are defined',
		args: {
			// @ts-ignore
			query: () => emailValidation({
				to: 'to@email.com',
				from: 'from@email.com',
				body: "body"
			}),
			result: true
		}
	},
	{
		name: 'should return true when "subject" is an empty String',
		args: {
			query: () => emailValidation({
				to: 'to@email.com',
				from: 'from@email.com',
				body: "body",
				subject: ""
			}),
			result: true
		}
	},
	{
		name: 'should return true when "subject" value is a non-empty String',
		args: {
			query: () => emailValidation({
				to: 'to@email.com',
				from: 'from@email.com',
				body: "body",
				subject: "subject"
			}),
			result: true
		}
	},
	{
		name: 'should throw Error when "to" is not defined',
		args: {
			// @ts-ignore
			query: () => emailValidation({
				from: "a",
				subject: "b",
				body: "c"
			}),
			error: '"to" is required.'
		}
	},
	{
		name: 'should throw Error when "from" is not defined',
		args: {
			// @ts-ignore
			query: () => emailValidation({
				to: "a",
				subject: "b",
				body: "c"
			}),
			error: '"from" is required.'
		}
	},
	{
		name: 'should throw Error when "body" is not defined',
		args: {
			// @ts-ignore
			query: () => emailValidation({
				to: "a",
				from: "b",
				subject: "c"
			}),
			error: '"body" is required.'
		}
	},
	{
		name: 'should throw Error when "to" is not a String',
		args: {
			query: () => emailValidation({
				to: 1,
				from: "a",
				subject: "b",
				body: "c"
			}),
			error: '"to" is not of type String.'
		}
	},
	{
		name: 'should throw Error when "from" is not a String',
		args: {
			query: () => emailValidation({
				from: 1,
				to: "a",
				subject: "b",
				body: "c"
			}),
			error: '"from" is not of type String.'
		}
	},
	{
		name: 'should throw Error when "body" is not a String',
		args: {
			query: () => emailValidation({
				body: 1,
				to: "a",
				from: "b",
				subject: "c"
			}),
			error: '"body" is not of type String.'
		}
	},
	{
		name: 'should throw Error when "to" is too long for an email address',
		args: {
			query: () => emailValidation({
				to: "1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x@example.com",
				from: "thisisa@test.com",
				subject: "b",
				body: "c"
			}),
			error: '"to" is not a valid email address.'
		}
	},
	{
		name: 'should throw Error when "from" is too long for an email address',
		args: {
			query: () => emailValidation({
				to: "thisisa@test.com",
				from: "1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x1234567890123456789012345678901234567890123456789012345678901234+x@example.com",
				subject: "b",
				body: "c"
			}),
			error: '"from" is not a valid email address.'
		}
	},
	{
		name: 'should throw Error when "subject" is defined and not a String',
		args: {
			query: () => emailValidation({
				to: "thisisa@test.com",
				from: "thisisa@test.com",
				subject: 1,
				body: "d"
			}),
			error: '"subject" is not of type String.'
		}
	}
];

testArray(tests, ({ query, result, error }) => {
	let actual;
	try {
		actual = query();
	}
	catch ({ message }) {
		strictEqual(message, error);
		return;
	}
	strictEqual(actual, result);
});