// @ts-ignore
import test from 'node:test';
import Validator from 'fastest-validator';

export type Test = {
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
	name: {	type: "string" },
	timeout: { type: "number", optional: true },
	before: { type: "function", optional: true },
	after: { type: "function", optional: true },
	concurrency: { type: "number", optional: true },
	only: { type: "boolean", default: false },
	skip: { type: "boolean", default: false },
	todo: { type: "any", optional: true },
	args: { type: "any" }
};

const validator = new Validator();
const validate = validator.compile(schema);

export const testArray = (tests: Test[], func: Function) => {
	tests.forEach(val => {
		const results = validate(val);

		// if tests are not valid, validate will return an Array of errors
		if (Array.isArray(results)) {			
			const message = results.map(result => result.message).join('\r\n');
			
			throw Error(message);
		}

		const { name, timeout, before, after, concurrency, only, skip, todo, args } = val;

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

export default testArray;