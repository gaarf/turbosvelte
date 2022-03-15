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

import sjcl from './sjcl.js';
import english from './wordlist_english';

const WORDLISTS = { english };

export function generateMnemonic() {
	return new Mnemonic().generate();
}

class hmacSHA512 {
	constructor(key) {
		var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
		this.encrypt = function () {
			return hasher.encrypt.apply(hasher, arguments);
		};
	}
}

var PBKDF2_ROUNDS = 2048;
var RADIX = 2048;

class Mnemonic {
	constructor(language = 'english') {
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

		this.language = language;
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

	check(mnemonic) {
		mnemonic = this.splitWords(mnemonic);
		if (mnemonic.length == 0 || mnemonic.length % 3 > 0) {
			return false;
		}
		var idx = [];
		for (var i = 0; i < mnemonic.length; i++) {
			var word = mnemonic[i];
			var wordIndex = this.wordlist.indexOf(word);
			if (wordIndex == -1) {
				return false;
			}
			var binaryIndex = zfill(wordIndex.toString(2), 11);
			idx.push(binaryIndex);
		}
		var b = idx.join('');
		var l = b.length;
		var d = b.substring(0, (l / 33) * 32);
		var h = b.substring(l - l / 33, l);
		var nd = binaryStringToWordArray(d);
		var ndHash = sjcl.hash.sha256.hash(nd);
		var ndHex = sjcl.codec.hex.fromBits(ndHash);
		var ndBstr = zfill(hexStringToBinaryString(ndHex), 256);
		var nh = ndBstr.substring(0, l / 33);
		return h == nh;
	}

	toSeed(mnemonic, passphrase = '') {
		mnemonic = this.joinWords(this.splitWords(mnemonic)); // removes duplicate blanks
		var mnemonicNormalized = this.normalizeString(mnemonic);
		passphrase = this.normalizeString(passphrase);
		passphrase = 'mnemonic' + passphrase;
		var mnemonicBits = sjcl.codec.utf8String.toBits(mnemonicNormalized);
		var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
		var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits, PBKDF2_ROUNDS, 512, hmacSHA512);
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

function binaryStringToWordArray(binary) {
	var aLen = binary.length / 32;
	var a = [];
	for (var i = 0; i < aLen; i++) {
		var valueStr = binary.substring(0, 32);
		var value = parseInt(valueStr, 2);
		a.push(value);
		binary = binary.slice(32);
	}
	return a;
}

function zfill(source, length) {
	// return String(source).padStart(length, '0');
	source = source.toString();
	while (source.length < length) {
		source = '0' + source;
	}
	return source;
}

export default Mnemonic;
