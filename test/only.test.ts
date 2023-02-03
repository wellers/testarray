import { strictEqual } from "assert";
import { testArray, Test } from "../src/index.js";

const tests: Test<Args>[] = [
	{
		name: "given only is not set, should not run this test",
		args: () => {
			throw new Error("This is an error!");
		}
	},
	{
		name: "given only is true, should only run this test",
		only: true,
		args: {
			someArg: "someValue"
		}
	}
];

type Args = {
	someArg: string
};

testArray<Args>(tests, test => {
	strictEqual(test.someArg, "someValue");
});