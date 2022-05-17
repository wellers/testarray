import { strictEqual } from "assert";
import { testArray, Test } from "../src/index.js";

function addOne(num: number) {
	return num + 1;
}

const tests: Test[] = [
	{
		name: 'given num is 0, result should be 1',
		args: {
			num: 0,
			result: 1
		}
	},
	{
		name: 'given num is 1, result should be 2',
		args: {
			num: 1,
			result: 2
		}
	},
	{
		name: 'given num is 2, result should be 3',
		args: {
			num: 2,
			result: 3
		}
	},
	{
		name: 'given num is 3, result should be 4',
		args: {
			num: 3,
			result: 4
		}
	}
];

type TestArguments = {
	num: number,
	result: number
}

testArray(tests, (test: TestArguments) => {
	strictEqual(addOne(test.num), test.result);
});