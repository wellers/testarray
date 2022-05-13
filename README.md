## Overview

Node.js v18 introduced the experimental Test Runner module under `node:test`. 

Writing tests which check the same function but with different inputs often results in writing the same tedious boilerplate code.

```js
import test from 'node:test';
import { strictEqual } from "assert";

// function to test
function addOne(num) {
	return num + 1;
}

test("given num is 1, should return 2", (t) => {
	strictEqual(addOne(1), 2);
});

test("given num is 2, should return 3", (t) => {
	strictEqual(addOne(2), 3);
});

test("given num is 3, should return 4", (t) => {
	strictEqual(addOne(3), 4);
});
```

Defining your test cases using `testArray` will help reduce the boilerplate code produced when writing multiple `test()` statements.

```js
import { strictEqual } from "assert";
import testArray from "@wellers/testarray";

// function to test
function addOne(num) {
	return num + 1;
}

const tests = [
	{
		name: 'given num is 1, should return 2',
		args: {
			num: 1,
			result: 2
		}
	},
	{
		name: 'given num is 2, should return 3',		
		args: {
			num: 2,
			result: 3
		}
	},
	{
		name: 'given num is 3, should return 4',
		args: {
			num: 3,
			result: 4
		}
	}
];

testArray(tests, test => {
	strictEqual(addOne(test.num), test.result);
});
```

More involved examples are available [here](https://github.com/wellers/testarray/tree/master/examples).


## API

**`testArray(tests, func)`** - Given an array of tests, execute a function on each test's args.

* tests - `object[]` - Array of tests.
	* name - `string` - Name of the test.
	* timeout - `number` - Timeout in ms for this specific test.
	* before - `function` or `async function` - Execute a function prior to execution of the test.
	* after - `function` or `async function` - Execute a function after the execution of the test.
	* concurrency - `number` - The number of tests that can be run at the same time. Default: 1.
	* only - `boolean` - Only execute this test. `--test-only` command-line option is required when running tests to use this option.
	* skip - `boolean` - Skip this test.
	* todo - `boolean` or `string` - If truthy, the test marked as TODO. If a string is provided, that string is displayed in the test results as the reason why the test is TODO.
	* args - `object`, `function` or `async function` - Definition of the test data which will be passed to the `func`.
* func - `function(test)` or `async function(test)` - Receives the test args returned on test.
