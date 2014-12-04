
// test
var f = ''
// test #2

module foo {
    function bar() { }
}
// test #3

module empty {
}
// test #4
class hello {
}
// test #5

var test = '';

/* test #6 */ ; // test #7

// operator >
var test2 = '';

function bar(t, u, v) {
    // errors
    var r;
}; // error

var val = 5; // val -> number

// a
function f42(i: number, ...args); /// <reference path="bar" .../>
//d
/*! e pin */
function f42(i: string, ...args); // c
function f42(i: any, ...args) { // f
   var foo: any[]; // g
}


// Declare comment not emitted
declare module 'external1' {
    var q;
}

var h = 1; // h
var j = 2;

// end of file
