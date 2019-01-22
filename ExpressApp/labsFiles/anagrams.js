const fs = require('fs');

function getWordsFromFile() {
	try {
		return fs.readFileSync('labsFiles/anagrams.txt', 'utf8');
	} catch(e) {
		console.log('Error:', e.stack);
		return [];
	}
}

function generateAnagram(string) {
	if (string.length < 2) return string; // This is our break condition

	var permutations = []; // This array will hold our permutations

	for (var i=0; i<string.length; i++) {
		var char = string[i];

		// Cause we don't want any duplicates:
		if (string.indexOf(char) !== i) // if char was used already
			continue;           // skip it this time

		var remainingString = string.slice(0,i) + string.slice(i+1,string.length); //Note: you can concat Strings via '+' in JS

		for (var subPermutation of generateAnagram(remainingString))
			permutations.push(char + subPermutation)

	}
	return permutations;
}

function getAnagramsFromFile() {
	let words = getWordsFromFile().split(' ');
	let anagrams = [];

	words.forEach(function (it) {
		anagrams.push(generateAnagram(it));
	});
	return anagrams;
}

module.exports = getAnagramsFromFile;