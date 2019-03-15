const fs = require('fs');

function getWordsFromFile() {
	try {
		return fs.readFileSync('labsFiles/anagrams.txt', 'utf8');
	} catch (e) {
		console.log('Error:', e.stack);
		return '';
	}
}

function sortString(str) {
	let a = str.split('');
	a.sort();
	return a.join('');
}

function generateAnagram(string) {
	if (string.length < 2) return string;

	var permutations = [];

	for (var i = 0; i < string.length; i++) {
		var char = string[i];

		if (string.indexOf(char) !== i)
			continue;

		var remainingString = string.slice(0, i) + string.slice(i + 1, string.length);

		for (var subPermutation of generateAnagram(remainingString))
			permutations.push(char + subPermutation)

	}
	return permutations;
}

function generateAnagramsFromFile() {
	let words = getWordsFromFile().split(' ');
	let anagrams = {};

	words.forEach(function (it) {
		anagrams[it] = generateAnagram(sortString(it));
	});
	return anagrams;
}

function getArrayOfAnagramsFromFile() {
	let words = getWordsFromFile().split('\n');
	let anagrams = {};

	words.forEach(function (it) {
		let sorted = sortString(it);

		if(anagrams[sorted] === undefined)
			anagrams[sorted] = [];

		anagrams[sorted].push(it);
	});

	return Object
		.keys(anagrams)
		.filter(a => anagrams[a].length > 1)
		.reduce(( p, c ) => Object.assign(p, { [c]: anagrams[c] }), {})
}

module.exports = getArrayOfAnagramsFromFile;