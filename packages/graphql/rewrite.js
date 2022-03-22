#!/usr/bin/env node
const fs = require('fs');
const FILENAME = process.argv[2];

console.log(`Rewriting ${FILENAME} ...`);

fs.readFile(FILENAME, function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}
	const lines = data.toString().split('\n');

	const [first] = lines;
	if (first.startsWith('import { TypedDocumentNode')) {
		lines[0] = first.replace(/^import/, 'import type');
	} else {
		console.log('Nothing to do on first line!');
		process.exit(0);
	}

	fs.writeFileSync(FILENAME, lines.join('\n'));
	console.log(`Wrote ${lines.length} lines!`);
});
