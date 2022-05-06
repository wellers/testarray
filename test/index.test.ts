import { promisify } from 'util';
import child_process from 'child_process';
import path from 'path';
import { testArray, Test } from '../src/index.js';

const exec = promisify(child_process.exec);

const tests: Test[] = [
	{
		name: 'arguments tests',
		args: {
			file: 'arguments.test.ts'
		}
	},
	{
		name: 'after tests',
		args: {
			file: 'after.test.ts'
		}
	},
	{
		name: 'example tests',
		args: {
			file: 'example.test.ts'
		}
	},
	{
		name: 'only tests',		
		args: {
			only: true,
			file: 'only.test.ts'
		}
	},
	{
		name: 'todo tests',
		args: {			
			file: 'todo.test.ts'
		}
	}
]

type TestArguments = {
	file: string,
	only: boolean,
	todo: boolean | string
};

testArray(tests, ({ file, only }: TestArguments) => new Promise<void>(async (resolve, reject) => {
	const testPath = path.join('./test', file);
	const isOnlyTest = only ? '--test-only ' : '';

	try {
		await exec(`node --loader ts-node/esm ${isOnlyTest}${testPath}`);
	}
	catch({ message }) {
		return reject(message);
	}	

	return resolve();	
}));