// ==UserScript==
// @name         ZJUlib2douban
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在ZJU图书馆书目详情页面右上角添加一个前往豆瓣该书页面的链接，仅限具有ISBN的书目。
// @author       AlainAllen
// @match        *://opac.zju.edu.cn/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// @grant        GM_setClipboard
// ==/UserScript==
(function() {
    'use strict';

    // Function to extract the last ISBN using regular expression
    function extractLastISBN() {
        // Regular expression for matching ISBN-10 and ISBN-13
        var isbnRegex = /ISBN(?:-1[03])?:?\s*(\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,7}-?[\dX])/g;
        var bodyText = document.body.innerText;
        var isbnMatches = [...bodyText.matchAll(isbnRegex)];
        if (isbnMatches.length > 0) {
            // Get the last match
            var lastIsbnMatch = isbnMatches[isbnMatches.length - 1];
            var isbn = lastIsbnMatch[1]; // Capture group 1 contains the ISBN
            return isbn;
        } else {
            return null;
        }
    }

    // Function to create and append the link
    function appendLink(isbn) {
        if (isbn) {
            // Create the link element
            console.log(isbn);
            var header = document.getElementById('header');
            var link = document.createElement('a')
            var linkText = '豆瓣'; // Change this to your desired link text
            link.appendChild(document.createTextNode(linkText));
            link.title = linkText;
            link.className = 'smc';
            link.href = 'http://douban.com/isbn/' + isbn + '/'; // Change this to your desired URL structure

            // Append the link to the body or any other element of your choice
            header.appendChild(link);
        } else {
            console.log('ISBN not found. Cannot create link.');
        }
    }

    // Run the functions when the page loads
    window.addEventListener('load', function() {
        var isbn = extractLastISBN();
        appendLink(isbn);
    });
})();