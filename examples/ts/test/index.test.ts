import { strictEqual } from "assert";
import { testArray, Test } from "@wellers/testarray";
import { addOne } from "../src/index.js";

const tests: Test<Args>[] = [
	{
		name: "given num is a string, should throw an error",
		args: {
			// @ts-ignore
			query: () => addOne("Hello, World"),			
			error: "num must be of type number."
		}
	},
	{
		name: "given num is 0, result should be 1",
		args: {
			query: () => addOne(0),
			result: 1
		}
	},
	{
		name: "given num is 1, result should be 2",
		args: {
			query: () => addOne(1),
			result: 2
		}
	},
	{
		name: "given num is 2, result should be 3",
		args: {
			query: () => addOne(2),
			result: 3
		}
	},
	{
		name: "given num is 3, result should be 4",
		args: {
			query: () => addOne(3),
			result: 4			
		}
	}
];

type Args = {
	query: () => any,
	result?: number,
	error?: string
}

testArray<Args>(tests, test => {
	let actual: number;
	try {
		actual = test.query();
	}
	catch ({ message }) {
		strictEqual(message, test.error);
		return;
	}
	strictEqual(actual, test.result);
});