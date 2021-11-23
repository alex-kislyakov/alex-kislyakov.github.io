---
---

const HIGH_MATCH_BOUNDARY = -20;
const LOW_MATCH_BOUNDARY = -500;

var searchInputElems;
var sections;


function search() {
    sections['blogs-list'].innerHTML = getPostsSectionHTML(getPostsList());
}

function assignInputElements() {
    searchInputElems = {
        'tags': document.getElementById('tags'),
        'name': document.getElementById('name'),
    };
}
function assignSectionElements() {
    sections = {
        'blogs-list': document.getElementById('blogs-list'),
    }
}
function clearFields() {
    searchInputElems['tags'].value = '';
    searchInputElems['name'].value = '';
    search();
}


function isIncludes(noteVal, userVal) {
    if (userVal == null || userVal == '') {
        return true;
    }
    return userVal.includes(noteVal);
}
function getFuzzyMatchScore(noteVal, userVal) {
    if (userVal == null || userVal === '') {
        return 0;
    }
    var results = fuzzysort.go(userVal, noteVal.split('|'));
    return (results.length == 0 
        ? Number.NEGATIVE_INFINITY : results[0]['score']);
}

function getPostHTML(post) {
    return '\
    <li>\
        <span class="post-meta">' + post['date'] + '</span>\
        <h3>\
            <a class="post-link" href="' + post['url'] + '">' +
                post['title'] +
            '</a>\
        </h3>\
    </li>';
}
function getMatchingGroups(elementsList) {
    let matchingGroups = {'highMatch': '', 'medMatch': '', 'lowMatch': ''};
    elementsList.sort(function(first, second) { return second[0] - first[0]; });
    elementsList.forEach(function(item, index, array) {
        if (item[0] >= HIGH_MATCH_BOUNDARY) {
            matchingGroups['highMatch'] += item[1];
        } else if (item[0] > LOW_MATCH_BOUNDARY) {
            matchingGroups['medMatch'] += item[1];
        } else {
            matchingGroups['lowMatch'] += item[1];
        }
    })
    return matchingGroups;
}
function getPostsSectionHTML(postsList) {
    const notesGroups = getMatchingGroups(postsList);
    let hmNum = notesGroups['highMatch'].length,
        mmNum = notesGroups['medMatch'].length,
        lmNum = notesGroups['lowMatch'].length;
    let blogsSectionHTML = '';
    if (hmNum !== 0 && (mmNum + lmNum) !== 0) {
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

function isPostTagsMatching(postTags) {
    let inputTags = searchInputElems['tags'].value.split(' ');
    for (let i = 0; i < postTags.length; ++i) {
        for (let j = 0; j < inputTags.length; ++j) {
            if (postTags[i].includes(inputTags[j])) {
                return true;
            }
        }
    }
    return false;
}

function isPostMatching(post) {
    if (searchInputElems['tags'].value === '')
        return true;
    if (post['tags'] === null)
        return false;
    return isPostTagsMatching(post['tags']);
}
function getPostsList() {
    let list = [];
    let postEntry = {};
    //{% for post in site.posts %}
    //{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    //
        postEntry = {
            'tags': {{ post.mytags |  jsonify}},
            'title': '{{ post.title | escape }}',
            'categories': '{{ post.categories }}',
            'date': '{{ post.date | date: date_format}}',
            'url': '{{ post.url | relative_url }}',
        }
        if (isPostMatching(postEntry)) {
            list.push([
                getFuzzyMatchScore(postEntry['title'],
                    searchInputElems['name'].value),
                        getPostHTML(postEntry)]);
        } 
    //{% endfor %}
    return list;
}

function showTags(tags) {
    searchInputElems['tags'].value = tags;
    search();
}       

