// @ts-ignore
import test from 'node:test';
import Validator from 'fastest-validator';

/**
* Definition of a test.
* @prop {string} name - Name of the test. 
* @prop {number} [timeout] - Timeout in ms for this specific test.
* @prop {function} [before] - Execute a function prior to execution of the test.
* @prop {function} [after] - Execute a function after the execution of the test.
* @prop {number} [concurrency] - The number of tests that can be run at the same time. Default: 1.
* @prop {boolean} [only] - Only execute this test. `--test-only` command-line option is required when running tests to use this option.
* @prop {boolean} [skip] - Skip this test.
* @prop {boolean|string} [todo] - If truthy, the test marked as TODO. If a string is provided, that string is displayed in the test results as the reason why the test is TODO.
* @prop {any} args - Definition of the test data which will be passed to func.
*/
type Test = {
	name: string,
	timeout?: number,
	before?: Function,
	after?: Function,
	concurrency?: number,
	only?: boolean,
	skip?: boolean,
	todo?: boolean | string,
	args: any
};

type TestOptions = {
	concurrency?: number,
	only?: boolean,
	skip?: boolean,
	todo?: boolean | string
}

const schema = {
	name: { type: "string" },
	timeout: { type: "number", optional: true },
	before: { type: "function", optional: true },
	after: { type: "function", optional: true },
	concurrency: { type: "number", optional: true },
	only: { type: "boolean", default: false },
	skip: { type: "boolean", default: false },
	todo: [
		{ type: "boolean", optional: true }, 
		{ type: "string", optional: true }
	],
	args: { type: "any" },
	$$strict: true
};

const validator = new Validator();
const validate = validator.compile(schema);

/**
 * Given an array of tests, execute a function on each test's args.
 * @param {Test[]} tests - Array of tests.
 * @param {function} func - Receives the test args returned on test.
 */
const testArray = (tests: Test[], func: Function) => {
	tests.forEach(val => {
		const results = validate(val);

		// if tests are not valid, validate will return an Array of errors
		if (Array.isArray(results)) {
			const message = results.map(result => result.message).join('\r\n');

			throw Error(message);
		}

		const {
			name,
			timeout,
			before,
			after,
			concurrency,
			only,
			skip,
			todo,
			args
		} = val;

		const options: TestOptions = {
			concurrency,
			only,
			skip,
			todo
		};

		test(name, options, async () => {
			if (timeout !== undefined) {
				return new Promise((resolve) => setTimeout(resolve, timeout));
			}

			const test = args instanceof Function
				? await args()
				: args;

			if (before !== undefined) {
				await before(test);
			}

			await func(test);

			if (after !== undefined) {
				await after(test);
			}
		});
	});
};

export { testArray, Test }

export default testArray;