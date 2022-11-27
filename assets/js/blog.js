const HIGH_MATCH_BOUNDARY = -20;
const LOW_MATCH_BOUNDARY = -500;

var searchInputElems;
var sections;

class Post {
	title;
	url;
	tags;

	constructor(title, url, tags) {
		this.title = title;
		this.url = url;
		this.tags = tags === '' ? [] : tags.split(' ');
	}
}

const posts = [
	new Post(
		'Cмысл восхождения в горы',
		'https://dzen.ru/a/YuRIU4msRXyJHeVk',
		'жизнь путешествия поход',
	),
	new Post(
		'Свадхистана чакра',
		'https://dzen.ru/a/Y4N58rmSVxp6Nk3e',
		'йога медитация осознанность психология',
	),
	new Post(
		'Муладхара чакра',
		'https://dzen.ru/a/Y4OAAAPpnGjYFKJO',
		'йога медитация муладхара психология',
	),
	new Post(
		'Эмоциональное выгорание',
		'https://dzen.ru/a/Y4N-k21Z71GFrzxG',
		'психология эмоциональное выгорание',
	),
	new Post(
		'Творчество, или как позволить себе быть творцом',
		'https://dzen.ru/a/Y4N5FG4LRTSS3Wgs',
		'жизнь творчество психология художник осознанность',
	),
	new Post(
		'Манипура чакра',
		'https://dzen.ru/a/Y4OOqYlHGw5gMuKc',
		'йога медитация манипура психология',
	),
];

function getInputTags() {
	const val = searchInputElems['tags'].value;
	if (val === '') return [];
	return val.split(' ');
}

function getInputName() {
	return searchInputElems['name'].value;
}

function search() {
	sections['blogs-list'].innerHTML = getPostsSectionHTML(getPostsList());
}

function assignInputElements() {
	searchInputElems = {
		tags: document.getElementById('tags'),
		name: document.getElementById('name'),
	};
}

function assignSectionElements() {
	sections = {
		'blogs-list': document.getElementById('blogs-list'),
	};
}

function clearFields() {
	searchInputElems['tags'].value = '';
	searchInputElems['name'].value = '';
	search();
}

function getFuzzyMatchScore(post, inputName) {
	if (inputName === '') return 0;
	const results = fuzzysort.go(inputName, [post.title]);
	return results.length === 0 ? Number.NEGATIVE_INFINITY : results[0]['score'];
}

function getPostHTML(post) {
	return (
		'\
    <li>\
        <span class="post-meta">' +
		'#' +
		post.tags.join(' #') +
		'</span>\
        <h3>\
            <a class="post-link" href="' +
		post.url +
		'">' +
		post.title +
		'</a>\
    </h3>\
</li>'
	);
}

function getMatchingGroups(elementsList) {
	let matchingGroups = { highMatch: '', medMatch: '', lowMatch: '' };
	elementsList.sort(function (first, second) {
		return second[0] - first[0];
	});
	elementsList.forEach(function (item, index, array) {
		if (item[0] >= HIGH_MATCH_BOUNDARY) {
			matchingGroups['highMatch'] += item[1];
		} else if (item[0] > LOW_MATCH_BOUNDARY) {
			matchingGroups['medMatch'] += item[1];
		} else {
			matchingGroups['lowMatch'] += item[1];
		}
	});
	return matchingGroups;
}

function getPostsSectionHTML(postsList) {
	const notesGroups = getMatchingGroups(postsList);
	let hmNum = notesGroups['highMatch'].length,
		mmNum = notesGroups['medMatch'].length,
		lmNum = notesGroups['lowMatch'].length;
	let blogsSectionHTML = '';
	if (hmNum !== 0 && mmNum + lmNum !== 0) {
		blogsSectionHTML += '<hr><h2>Высокое совпадение</h2>';
	}
	blogsSectionHTML += notesGroups['highMatch'];
	if (mmNum !== 0) {
		blogsSectionHTML += '<hr><h2>Среднее совпадение</h2>';
	}
	blogsSectionHTML += notesGroups['medMatch'];
	if (lmNum) {
		blogsSectionHTML += '<hr><h2>Низкое совпадение</h2>';
	}
	blogsSectionHTML += notesGroups['lowMatch'];
	return blogsSectionHTML;
}

function isPostMatching(post, inputTags) {
	console.log(post, inputTags);
	if (inputTags.length === 0) return true;
	for (const inputTag of inputTags) {
		for (const tag of post.tags) {
			if (tag.includes(inputTag)) return true;
		}
	}
	return false;
}

function getPostsList() {
	let list = [];
	const inputTags = getInputTags();
	for (const post of posts) {
		if (isPostMatching(post, inputTags)) {
			list.push([getFuzzyMatchScore(post, getInputName()), getPostHTML(post)]);
		}
	}
	return list;
}

function showTags(tags) {
	searchInputElems['tags'].value = tags;
	search();
}
