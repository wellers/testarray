// @ts-check
import { strictEqual } from 'assert';
import testArray from '@wellers/testarray'
import { isValidEmail } from '../lib/index.js';

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
		name: 'should return true when "email" contains other special characters',
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
			query: () => isValidEmail(''),
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
	}
];

testArray(tests, test => {
	let actual;
	try {
		actual = test.query();
	}
	catch ({ message }) {
		strictEqual(message, test.error);
		return;
	}
	strictEqual(actual, test.result);
});