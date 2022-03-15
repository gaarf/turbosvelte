declare class Mnemonic {
	constructor(language: 'english');
	generate(): string;
	check(m: string): boolean;
	toSeed(m: string, p?: string): string;
	toMnemonic(b: number[]): string;
}

export function generateMnemonic(): string;
export default Mnemonic;
