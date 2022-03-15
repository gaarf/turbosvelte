/*
 * Copyright (c) 2013 Pavol Rusnak
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Javascript port from python by Ian Coleman
 *
 * Requires code from sjcl
 * https://github.com/bitwiseshiftleft/sjcl
 */

import sjcl from 'sjcl';
import english from './wordlist_english';

const WORDLISTS = { english };

export default function generateMnemonic(passphrase = '') {
	const i = new Mnemonic();
	const mnemonic = i.generate();
	const seed = i.toSeed(mnemonic, passphrase);
	return { mnemonic, seed };
}

class HmacSHA512 {
	constructor(key) {
		this.hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
	}
	encrypt(...args) {
		return this.hasher.encrypt(...args);
	}
}

const PBKDF2_ROUNDS = 2048;
const RADIX = 2048;

class Mnemonic {
	constructor(language = 'english') {
		this.language = language;

		const wordlist = WORDLISTS[language];

		if (wordlist.length != RADIX) {
			throw (
				'Wordlist should contain ' +
				RADIX +
				' words, but it contains ' +
				wordlist.length +
				' words.'
			);
		}

		this.wordlist = wordlist;
	}

	generate(strength) {
		strength = strength || 128;
		var r = strength % 32;
		if (r > 0) {
			throw 'Strength should be divisible by 32, but it is not (' + r + ').';
		}
		var hasStrongCrypto = 'crypto' in window && window['crypto'] !== null;
		if (!hasStrongCrypto) {
			throw 'Mnemonic should be generated with strong randomness, but crypto.getRandomValues is unavailable';
		}
		var buffer = new Uint8Array(strength / 8);
		var data = crypto.getRandomValues(buffer);
		return this.toMnemonic(data);
	}

	toMnemonic(byteArray) {
		if (byteArray.length % 4 > 0) {
			throw (
				'Data length in bits should be divisible by 32, but it is not (' +
				byteArray.length +
				' bytes = ' +
				byteArray.length * 8 +
				' bits).'
			);
		}

		var data = byteArrayToWordArray(byteArray);
		var hash = sjcl.hash.sha256.hash(data);
		var h = sjcl.codec.hex.fromBits(hash);

		var a = byteArrayToBinaryString(byteArray);
		var c = zfill(hexStringToBinaryString(h), 256);
		var d = c.substring(0, (byteArray.length * 8) / 32);
		var b = a + d;

		var result = [];
		var blen = b.length / 11;
		for (var i = 0; i < blen; i++) {
			var idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
			result.push(this.wordlist[idx]);
		}
		return this.joinWords(result);
	}

	toSeed(mnemonic, passphrase = '') {
		mnemonic = this.joinWords(this.splitWords(mnemonic)); // removes duplicate blanks
		var mnemonicNormalized = this.normalizeString(mnemonic);
		passphrase = this.normalizeString(passphrase);
		passphrase = 'mnemonic' + passphrase;
		var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonicNormalized);
		var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
		var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits, PBKDF2_ROUNDS, 512, HmacSHA512);
		var hashHex = sjcl.codec.hex.fromBits(result);
		return hashHex;
	}

	splitWords(mnemonic) {
		return mnemonic.split(/\s/g).filter(function (x) {
			return x.length;
		});
	}

	joinWords(words) {
		// Set space correctly depending on the language
		// see https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md#japanese
		var space = ' ';
		if (this.language == 'japanese') {
			space = '\u3000'; // ideographic space
		}
		return words.join(space);
	}

	normalizeString(str) {
		return str.normalize('NFKD');
	}
}

function byteArrayToWordArray(data) {
	var a = [];
	var v;
	for (var i = 0; i < data.length / 4; i++) {
		v = 0;
		v += data[i * 4 + 0] << (8 * 3);
		v += data[i * 4 + 1] << (8 * 2);
		v += data[i * 4 + 2] << (8 * 1);
		v += data[i * 4 + 3] << (8 * 0);
		a.push(v);
	}
	return a;
}

function byteArrayToBinaryString(data) {
	var bin = '';
	for (var i = 0; i < data.length; i++) {
		bin += zfill(data[i].toString(2), 8);
	}
	return bin;
}

function hexStringToBinaryString(hexString) {
	var binaryString = '';
	for (var i = 0; i < hexString.length; i++) {
		binaryString += zfill(parseInt(hexString[i], 16).toString(2), 4);
	}
	return binaryString;
}

// Pad a numeric string on the left with zero digits until the given width
// is reached.
// Note this differs to the python implementation because it does not
// handle numbers starting with a sign.
function zfill(source, length) {
	return String(source).padStart(length, '0');
}
