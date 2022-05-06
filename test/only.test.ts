import { strictEqual } from 'assert';
import { testArray, Test } from '../src/index.js';

const tests: Test[] = [
	{
		name: 'given only is not set, should not run this test',
		args: () => {
			throw new Error("This is an error!");
		}
	},
	{
		name: 'given only is true, should only run this test',
		only: true,
		args: {
			someArg: 'someValue'
		}
	}
];

type TestArguments = {
	someArg: string
};

testArray(tests, (test: TestArguments) => {
	strictEqual(test.someArg, "someValue");
});