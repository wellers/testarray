import { strictEqual } from "assert";
import { testArray, Test } from "../src/index.js";

const tests: Test<Args>[] = [
	{
		name: "given a timeout within the test, should clear timeout after test.",
		args: () => ({
			arg: "someValue",
			x: setTimeout(() => { }, 5000)
		}),
		after: test => {
			clearTimeout(test.x);
		}
	}
];

type Args = {
	arg: string,
	x: NodeJS.Timeout
}

testArray<Args>(tests, args => strictEqual(args.arg, "someValue"));