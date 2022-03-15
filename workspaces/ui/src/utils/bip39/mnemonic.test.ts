import english from './wordlist_english';
import Mnemonic from './mnemonic';

const WORDLISTS = { english };

describe('Mnemonic', () => {
	// test_vectors
	it('check_list', function () {
		const mnemo = new Mnemonic('english');
		for (let i = 0; i < vectors.length; i++) {
			const v = vectors[i];
			const array = hexStringToArray(v.entropy);
			const code = mnemo.toMnemonic(array);
			const seed = mnemo.toSeed(code, v.passphrase);
			expect(mnemo.check(v.mnemonic)).toBeTruthy();
			expect(code).toEqual(v.mnemonic);
			expect(seed).toEqual(v.seed);
		}
	});

	// mnemonic.generate
	xit('mnemonic.generate', function () {
		const mnemo = new Mnemonic('english');
		for (let i = 0; i < 30; i++) {
			const m = mnemo.generate();
			expect(mnemo.check(m)).toBeTruthy();
		}
	});

	// test_failed_checksum
	it('test_failed_checksum', function () {
		const code = 'bless cloud wheel regular tiny venue bird web grief security dignity zoo';
		const mnemo = new Mnemonic('english');
		expect(mnemo.check(code)).toBeFalsy();
	});

	// test_lengths
	// from https://github.com/trezor/python-mnemonic/blob/f9f7720ab79b07a86e0c10071d56d2a3ed5ab27c/test_mnemonic.py#L76
	it('test_lengths', function () {
		const wordlist = WORDLISTS['english'];
		for (let j = 0; j < wordlist.length; j++) {
			const word = wordlist[j];
			expect(word.length >= 3).toBeTruthy();
			expect(word.length <= 8).toBeTruthy();
		}
	});

	// test_validchars
	// from https://github.com/trezor/python-mnemonic/blob/f9f7720ab79b07a86e0c10071d56d2a3ed5ab27c/test_mnemonic.py#L86
	it('test_validchars', function () {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		const wordlist = WORDLISTS['english'];
		for (let i = 0; i < wordlist.length; i++) {
			const word = wordlist[i];
			for (let j = 0; j < word.length; j++) {
				const letter = word[j];
				expect(alphabet.indexOf(letter) > -1).toBeTruthy();
			}
		}
	});

	// test_sorted_unique
	// from https://github.com/trezor/python-mnemonic/blob/f9f7720ab79b07a86e0c10071d56d2a3ed5ab27c/test_mnemonic.py#L97
	it('test_sorted_unique', function () {
		const wordlist = WORDLISTS['english'];
		const clone = [];
		for (let i = 0; i < wordlist.length; i++) {
			clone.push(wordlist[i]);
		}
		clone.sort();
		for (let i = 0; i < clone.length; i++) {
			// Sorted
			expect(clone[i]).toEqual(wordlist[i]);
			// Unique
			if (i != 0) {
				expect(clone[i - 1]).not.toEqual(clone[i]);
			}
		}
	});

	// test_utf8_nfkd
	// from https://github.com/trezor/python-mnemonic/blob/f9f7720ab79b07a86e0c10071d56d2a3ed5ab27c/test_mnemonic.py#L196
	it('test_utf8_nfkd', function () {
		// The same sentence in letious UTF-8 forms
		const words_nfkd =
			'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';
		const words_nfc =
			'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
		const words_nfkc =
			'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
		const words_nfd =
			'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';

		const passphrase_nfkd =
			'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';
		const passphrase_nfc = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
		const passphrase_nfkc = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
		const passphrase_nfd =
			'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';

		const mnemo = new Mnemonic('english');
		const seed_nfkd = mnemo.toSeed(words_nfkd, passphrase_nfkd);
		const seed_nfc = mnemo.toSeed(words_nfc, passphrase_nfc);
		const seed_nfkc = mnemo.toSeed(words_nfkc, passphrase_nfkc);
		const seed_nfd = mnemo.toSeed(words_nfd, passphrase_nfd);

		expect(seed_nfkd).toEqual(seed_nfc);
		expect(seed_nfkd).toEqual(seed_nfkc);
		expect(seed_nfkd).toEqual(seed_nfd);
	});

	// Test handling multiple consecutive spaces
	// See https://github.com/iancoleman/bip39/issues/19
	it('test multiple spaces', function () {
		const mnemo = new Mnemonic('english');
		const seed = mnemo.toSeed('urge cat  bid');
		expect(seed).toEqual(
			'e0d441a3030c22ce7b271d39dfbdb8b6754bbff513af100689fe81a106b041855cad240b818051a326dedd1d7deb336b98a7eaf939e5ef5013e671c412f3a119'
		);
	});

	it('blank mnemonic', function () {
		const m = new Mnemonic('english');
		expect(m.check('')).toBeFalsy();
	});
});

const vectors = [
	{
		entropy: '00000000000000000000000000000000',
		mnemonic:
			'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
		passphrase: 'TREZOR',
		seed: 'c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04'
	},
	{
		entropy: '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
		mnemonic: 'legal winner thank year wave sausage worth useful legal winner thank yellow',
		passphrase: 'TREZOR',
		seed: '2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607'
	},
	{
		entropy: '80808080808080808080808080808080',
		mnemonic: 'letter advice cage absurd amount doctor acoustic avoid letter advice cage above',
		passphrase: 'TREZOR',
		seed: 'd71de856f81a8acc65e6fc851a38d4d7ec216fd0796d0a6827a3ad6ed5511a30fa280f12eb2e47ed2ac03b5c462a0358d18d69fe4f985ec81778c1b370b652a8'
	},
	{
		entropy: 'ffffffffffffffffffffffffffffffff',
		mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong',
		passphrase: 'TREZOR',
		seed: 'ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069'
	},
	{
		entropy: '000000000000000000000000000000000000000000000000',
		mnemonic:
			'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent',
		passphrase: 'TREZOR',
		seed: '035895f2f481b1b0f01fcf8c289c794660b289981a78f8106447707fdd9666ca06da5a9a565181599b79f53b844d8a71dd9f439c52a3d7b3e8a79c906ac845fa'
	},
	{
		entropy: '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
		mnemonic:
			'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will',
		passphrase: 'TREZOR',
		seed: 'f2b94508732bcbacbcc020faefecfc89feafa6649a5491b8c952cede496c214a0c7b3c392d168748f2d4a612bada0753b52a1c7ac53c1e93abd5c6320b9e95dd'
	},
	{
		entropy: '808080808080808080808080808080808080808080808080',
		mnemonic:
			'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always',
		passphrase: 'TREZOR',
		seed: '107d7c02a5aa6f38c58083ff74f04c607c2d2c0ecc55501dadd72d025b751bc27fe913ffb796f841c49b1d33b610cf0e91d3aa239027f5e99fe4ce9e5088cd65'
	},
	{
		entropy: 'ffffffffffffffffffffffffffffffffffffffffffffffff',
		mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when',
		passphrase: 'TREZOR',
		seed: '0cd6e5d827bb62eb8fc1e262254223817fd068a74b5b449cc2f667c3f1f985a76379b43348d952e2265b4cd129090758b3e3c2c49103b5051aac2eaeb890a528'
	},
	{
		entropy: '0000000000000000000000000000000000000000000000000000000000000000',
		mnemonic:
			'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art',
		passphrase: 'TREZOR',
		seed: 'bda85446c68413707090a52022edd26a1c9462295029f2e60cd7c4f2bbd3097170af7a4d73245cafa9c3cca8d561a7c3de6f5d4a10be8ed2a5e608d68f92fcc8'
	},
	{
		entropy: '7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f',
		mnemonic:
			'legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title',
		passphrase: 'TREZOR',
		seed: 'bc09fca1804f7e69da93c2f2028eb238c227f2e9dda30cd63699232578480a4021b146ad717fbb7e451ce9eb835f43620bf5c514db0f8add49f5d121449d3e87'
	},
	{
		entropy: '8080808080808080808080808080808080808080808080808080808080808080',
		mnemonic:
			'letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless',
		passphrase: 'TREZOR',
		seed: 'c0c519bd0e91a2ed54357d9d1ebef6f5af218a153624cf4f2da911a0ed8f7a09e2ef61af0aca007096df430022f7a2b6fb91661a9589097069720d015e4e982f'
	},
	{
		entropy: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
		mnemonic:
			'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote',
		passphrase: 'TREZOR',
		seed: 'dd48c104698c30cfe2b6142103248622fb7bb0ff692eebb00089b32d22484e1613912f0a5b694407be899ffd31ed3992c456cdf60f5d4564b8ba3f05a69890ad'
	},
	{
		entropy: '77c2b00716cec7213839159e404db50d',
		mnemonic: 'jelly better achieve collect unaware mountain thought cargo oxygen act hood bridge',
		passphrase: 'TREZOR',
		seed: 'b5b6d0127db1a9d2226af0c3346031d77af31e918dba64287a1b44b8ebf63cdd52676f672a290aae502472cf2d602c051f3e6f18055e84e4c43897fc4e51a6ff'
	},
	{
		entropy: 'b63a9c59a6e641f288ebc103017f1da9f8290b3da6bdef7b',
		mnemonic:
			'renew stay biology evidence goat welcome casual join adapt armor shuffle fault little machine walk stumble urge swap',
		passphrase: 'TREZOR',
		seed: '9248d83e06f4cd98debf5b6f010542760df925ce46cf38a1bdb4e4de7d21f5c39366941c69e1bdbf2966e0f6e6dbece898a0e2f0a4c2b3e640953dfe8b7bbdc5'
	},
	{
		entropy: '3e141609b97933b66a060dcddc71fad1d91677db872031e85f4c015c5e7e8982',
		mnemonic:
			'dignity pass list indicate nasty swamp pool script soccer toe leaf photo multiply desk host tomato cradle drill spread actor shine dismiss champion exotic',
		passphrase: 'TREZOR',
		seed: 'ff7f3184df8696d8bef94b6c03114dbee0ef89ff938712301d27ed8336ca89ef9635da20af07d4175f2bf5f3de130f39c9d9e8dd0472489c19b1a020a940da67'
	},
	{
		entropy: '0460ef47585604c5660618db2e6a7e7f',
		mnemonic: 'afford alter spike radar gate glance object seek swamp infant panel yellow',
		passphrase: 'TREZOR',
		seed: '65f93a9f36b6c85cbe634ffc1f99f2b82cbb10b31edc7f087b4f6cb9e976e9faf76ff41f8f27c99afdf38f7a303ba1136ee48a4c1e7fcd3dba7aa876113a36e4'
	},
	{
		entropy: '72f60ebac5dd8add8d2a25a797102c3ce21bc029c200076f',
		mnemonic:
			'indicate race push merry suffer human cruise dwarf pole review arch keep canvas theme poem divorce alter left',
		passphrase: 'TREZOR',
		seed: '3bbf9daa0dfad8229786ace5ddb4e00fa98a044ae4c4975ffd5e094dba9e0bb289349dbe2091761f30f382d4e35c4a670ee8ab50758d2c55881be69e327117ba'
	},
	{
		entropy: '2c85efc7f24ee4573d2b81a6ec66cee209b2dcbd09d8eddc51e0215b0b68e416',
		mnemonic:
			'clutch control vehicle tonight unusual clog visa ice plunge glimpse recipe series open hour vintage deposit universe tip job dress radar refuse motion taste',
		passphrase: 'TREZOR',
		seed: 'fe908f96f46668b2d5b37d82f558c77ed0d69dd0e7e043a5b0511c48c2f1064694a956f86360c93dd04052a8899497ce9e985ebe0c8c52b955e6ae86d4ff4449'
	},
	{
		entropy: 'eaebabb2383351fd31d703840b32e9e2',
		mnemonic: 'turtle front uncle idea crush write shrug there lottery flower risk shell',
		passphrase: 'TREZOR',
		seed: 'bdfb76a0759f301b0b899a1e3985227e53b3f51e67e3f2a65363caedf3e32fde42a66c404f18d7b05818c95ef3ca1e5146646856c461c073169467511680876c'
	},
	{
		entropy: '7ac45cfe7722ee6c7ba84fbc2d5bd61b45cb2fe5eb65aa78',
		mnemonic:
			'kiss carry display unusual confirm curtain upgrade antique rotate hello void custom frequent obey nut hole price segment',
		passphrase: 'TREZOR',
		seed: 'ed56ff6c833c07982eb7119a8f48fd363c4a9b1601cd2de736b01045c5eb8ab4f57b079403485d1c4924f0790dc10a971763337cb9f9c62226f64fff26397c79'
	},
	{
		entropy: '4fa1a8bc3e6d80ee1316050e862c1812031493212b7ec3f3bb1b08f168cabeef',
		mnemonic:
			'exile ask congress lamp submit jacket era scheme attend cousin alcohol catch course end lucky hurt sentence oven short ball bird grab wing top',
		passphrase: 'TREZOR',
		seed: '095ee6f817b4c2cb30a5a797360a81a40ab0f9a4e25ecd672a3f58a0b5ba0687c096a6b14d2c0deb3bdefce4f61d01ae07417d502429352e27695163f7447a8c'
	},
	{
		entropy: '18ab19a9f54a9274f03e5209a2ac8a91',
		mnemonic: 'board flee heavy tunnel powder denial science ski answer betray cargo cat',
		passphrase: 'TREZOR',
		seed: '6eff1bb21562918509c73cb990260db07c0ce34ff0e3cc4a8cb3276129fbcb300bddfe005831350efd633909f476c45c88253276d9fd0df6ef48609e8bb7dca8'
	},
	{
		entropy: '18a2e1d81b8ecfb2a333adcb0c17a5b9eb76cc5d05db91a4',
		mnemonic:
			'board blade invite damage undo sun mimic interest slam gaze truly inherit resist great inject rocket museum chief',
		passphrase: 'TREZOR',
		seed: 'f84521c777a13b61564234bf8f8b62b3afce27fc4062b51bb5e62bdfecb23864ee6ecf07c1d5a97c0834307c5c852d8ceb88e7c97923c0a3b496bedd4e5f88a9'
	},
	{
		entropy: '15da872c95a13dd738fbf50e427583ad61f18fd99f628c417a61cf8343c90419',
		mnemonic:
			'beyond stage sleep clip because twist token leaf atom beauty genius food business side grid unable middle armed observe pair crouch tonight away coconut',
		passphrase: 'TREZOR',
		seed: 'b15509eaa2d09d3efd3e006ef42151b30367dc6e3aa5e44caba3fe4d3e352e65101fbdb86a96776b91946ff06f8eac594dc6ee1d3e82a42dfe1b40fef6bcc3fd'
	}
];

function hexStringToArray(str: string) {
	const arrayLen = str.length / 2;
	const array = [];
	for (let i = 0; i < arrayLen; i++) {
		const valueStr = str.substring(0, 2);
		const value = parseInt(valueStr, 16);
		array.push(value);
		str = str.slice(2);
	}
	return array;
}
