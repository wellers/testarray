import { testArray, Test } from "../src/index.js";

const tests: Test[] = [
	{
		name: 'given a timeout within the test, should clear timeout after test.',
		args: () => ({
			x: setTimeout(() => { }, 5000)
		}),
		after: (test: any) => {
			clearTimeout(test.x);
		}
	}
];

testArray(tests, () => {});