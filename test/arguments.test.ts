import { strictEqual } from "assert";
import { testArray, Test } from "../src/index.js";

const tests: Test[] = [
	{
		name: "given an object as args, should return true",
		args: {
			arg: "someValue"
		}
	},
	{
		name: "given a function as args, should return true",
		args: () => ({
			arg: "someValue"
		})
	},
	{
		name: "given an asynchronous function as args, should return true",
		args: async () => ({
			arg: "someValue"
		})
	},
	{
		name: "given a promise that defers the event loop, should return true",
		args: () => {
			const promise = new Promise(resolve => {
				setImmediate(() => resolve({ arg: "someValue" }));
			})

			return promise;
		}
	},
	{
		name: "given a before function, should run the function before the test",
		before: (test: any) => {
			test.arg = "someValue";
		},
		args: () => ({})
	},
	{
		name: "given an asynchronous before function, should run the function before the test",
		before: async (test: any) => {
			test.arg = "someValue";
		},
		args: () => ({})
	},
	{
		name: "given an after function, should run the function after the test",
		args: () => ({
			arg: "someValue"
		}),
		after: (test: any) => {
			clearTimeout(test.someArg)
		}
	},
	{
		name: "given a timeout, should pause for set timeout",
		timeout: 3000,
		args: async () => {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve({ arg: "someValue" });
				}, 100)
			})
		}
	},
	{
		name: "given skip is true, should skip test",
		skip: true,
		args: () => {
			throw Error("This is an error!");
		}
	}
];

type TestArguments = {
	arg: string
};

testArray(tests, ({ arg }: TestArguments) => {
	strictEqual(arg, "someValue");
});