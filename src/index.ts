import test from "node:test";
import Validator from "fastest-validator";

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
type Test<T = any> = {
	name: string,
	timeout?: number,
	before?: Before<T>,
	after?: After<T>,
	concurrency?: number,
	only?: boolean,
	skip?: boolean,
	todo?: boolean | string,
	args: TestArguments<T>
};

type TestArguments<T> = T | (() => T) | (() => Promise<T>);

type Before<T> = (args: T) => (any | Promise<any>);

interface TestFunction<T = any> {
	(args: T): any | Promise<any>;
} 

type After<T> = (args: T) => (any | Promise<any>);

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
 * Given an array of tests, execute a function on each test's arguments.
 * @param {Test[]} tests - Array of tests.
 * @param {TestFunction} fn - Receives the test args returned on test.
 */
function testArray<T = any>(tests: Test[], fn: TestFunction<T>) {
	tests.forEach(val => {
		const results = validate(val);

		// if tests are not valid, validate will return an Array of errors
		if (Array.isArray(results)) {
			const message = results.map(result => result.message).join("\r\n");
			throw Error(message);
		}

		const options: TestOptions = {
			concurrency: val.concurrency,
			only: val.only,
			skip: val.skip,
			todo: val.todo
		};

		test(val.name, options, async () => {
			if (val.timeout !== undefined) {
				return new Promise((resolve) => setTimeout(resolve, val.timeout));
			}

			const test = val.args instanceof Function 
				? await val.args() 
				: val.args;

			if (val.before !== undefined) {
				await val.before(test);
			}

			await fn(test);

			if (val.after !== undefined) {
				await val.after(test);
			}
		});
	});
}

export { testArray, Test, TestFunction }

export default testArray;