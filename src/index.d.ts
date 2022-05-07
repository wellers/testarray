declare module '@wellers/testarray' {
	export type Test = {
		name: string;
		timeout?: number;
		before?: Function;
		after?: Function;
		concurrency?: number;
		only?: boolean;
		skip?: boolean;
		todo?: string | boolean;
		args: any;
	};

	export function testArray(tests: Test[], func: Function): void;	
	export default testArray;
}