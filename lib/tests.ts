import { PaginatorService } from './index';
import { getCountup } from '@writetome51/get-countup-countdown';
import { arraysMatch } from '@writetome51/arrays-match';


// Setup:
let paginator = new PaginatorService(getCountup(1, 55));
// now paginator.data has numbers 1 thru 55, and itemsPerPage = 25.
let currentPageResults = [];


// Test 1: make sure paginator.getPage(index) returns the right items:
let page1 = paginator.getPage(0);
currentPageResults.push(paginator.currentPageNumber); // records current page.
let page2 = paginator.getPage(1);
currentPageResults.push(paginator.currentPageNumber); // records current page.
let page3 = paginator.getPage(2);
currentPageResults.push(paginator.currentPageNumber); // records current page.

if (arraysMatch(page1, getCountup(1, 25)) &&
	arraysMatch(page2, getCountup(26, 50)) &&
	arraysMatch(page3, getCountup(51, 55))) console.log('test 1 passed');
else console.log('test 1 FAILED');


// Test 1A:  make sure currentPageNumber results are accurate:
if (arraysMatch(currentPageResults, [1, 2, 3])) console.log('test 1A passed');
else console.log('test 1A FAILED');


// Test 1B:  test setting the currentPageNumber:
paginator.currentPageNumber = 1;
if (arraysMatch(paginator.currentPage, getCountup(1, 25))) console.log('test 1B passed');
else console.log('test 1B FAILED');

// Test 1C
if (paginator.currentPageNumber === 1) console.log('test 1C passed');
else console.log('test 1C FAILED');


// Test 2:  make sure paginator.getPage(index) returns the right items when
// the itemsPerPage is different:
currentPageResults = [];
paginator.itemsPerPage = 15;
page1 = paginator.getPage(0);
currentPageResults.push(paginator.currentPageNumber);
page2 = paginator.getPage(1);
currentPageResults.push(paginator.currentPageNumber);
page3 = paginator.getPage(2);
currentPageResults.push(paginator.currentPageNumber);
let page4 = paginator.getPage(3);
currentPageResults.push(paginator.currentPageNumber);

if (arraysMatch(page1, getCountup(1, 15)) &&
	arraysMatch(page2, getCountup(16, 30)) &&
	arraysMatch(page3, getCountup(31, 45)) &&
	arraysMatch(page4, getCountup(46, 55))) console.log('test 2 passed');
else console.log('test 2 FAILED');

// Test 2A:  make sure currentPageNumber results are accurate:
if (arraysMatch(currentPageResults, [1, 2, 3, 4])) console.log('test 2A passed');
else console.log('test 2A FAILED');


// Test 3:  if a pageIndex that doesn't exist is passed to .getPage() it should trigger
// error:
let errorTriggered = false;
try {
	let page6 = paginator.getPage(6);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 3 passed');
else console.log('test 3 FAILED');


// Test 4: Make sure paginator.totalPages is always correct after changing the amount
// of data and itemsPerPage several times:
let results = [];
let expectedResults = [1, 2, 4, 3];
paginator.data = [1, 2, 3, 4, 5];
paginator.itemsPerPage = 5;
results.push(paginator.totalPages);
paginator.data = [1, 2];
paginator.itemsPerPage = 1;
results.push(paginator.totalPages);
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 10
paginator.itemsPerPage = 3;
results.push(paginator.totalPages);
paginator.data = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]; // 20
paginator.itemsPerPage = 9;
results.push(paginator.totalPages);

if (arraysMatch(results, expectedResults)) console.log('test 4 passed');
else console.log('test 4 FAILED.');


// Test 4A: make sure calling .getPage() and accessing .currentPage return the same result.
paginator.data = getCountup(1, 50);
let gottenPage = paginator.getPage(1);
let currentPage = paginator.currentPage;
if (arraysMatch(gottenPage, currentPage) && paginator.currentPageNumber === 2)
	console.log('test 4A passed');
else console.log('test 4A FAILED.');


// Test 5: if itemsPerPage is set to a non-number, float, 0, or negative, an error is
// triggered.
// To pass, all these should trigger errors:
let numErrors = 0;
try {
	paginator.itemsPerPage = false;
}
catch (e) {
	++numErrors;
}
try {
	paginator.itemsPerPage = 1.2;
}
catch (e) {
	++numErrors;
}
try {
	paginator.itemsPerPage = 0;
}
catch (e) {
	++numErrors;
}
try {
	paginator.itemsPerPage = -0.1;
}
catch (e) {
	++numErrors;
}

if (numErrors === 4) console.log('test 5 passed');
else console.log('test 5 FAILED');


// Test 6: if paginator.data is set to a non-array, it triggers error:
errorTriggered = false;
try {
	paginator.data = {};
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 6 passed');
else console.log('test 6 FAILED');


// Test 7: if first argument to constructor is not array, it triggers error:
errorTriggered = false;
try {
	paginator = new PaginatorService({prop: 1});
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 7 passed');
else console.log('test 7 FAILED');


// Test 8: if second argument to constructor is not integer, it triggers error:
errorTriggered = false;
try {
	paginator = new PaginatorService([1, 2, 3], 1.05);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 8 passed');
else console.log('test 8 FAILED');


// Test 9: if second argument is less than 1, it triggers error:
errorTriggered = false;
try {
	paginator = new PaginatorService([1, 2, 3], 0);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 9 passed');
else console.log('test 9 FAILED');


// Test 10: if array is empty and you try to get the first page, it triggers error:
errorTriggered = false;
try {
	paginator = new PaginatorService([], 1);
	paginator.getPage(0);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 10 passed');
else console.log('test 10 FAILED');


// Test 11: if array is empty and you try to get a negative page index, it triggers error:
errorTriggered = false;
try {
	paginator = new PaginatorService([], 1);
	paginator.getPage(-1);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 11 passed');
else console.log('test 11 FAILED');


// Test 12: if itemsPerPage is greater than array length, it simply returns the entire array:
paginator = new PaginatorService([1, 2, 3, 4, 5], 12);
page1 = paginator.getPage(0);
if (arraysMatch(page1, [1, 2, 3, 4, 5])) console.log('test 12 passed');
else console.log('test 12 FAILED');
