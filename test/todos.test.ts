import { testArray, Test } from "../src/index.js";

const tests: Test[] = [
	{
		name: 'given todo is true, should return todo',
		todo: true,
		args: {
			arg: 'someValue'
		}
	},
	{
		name: 'given todo is a string, should return todo',
		todo: 'this is todo',
		args: {
			arg: 'someValue'
		}
	}
];

testArray(tests, () => {});