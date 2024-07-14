"use strict";
exports.__esModule = true;
var ncc = require("../src/NCC");
var isMyGuessCorrect = true;
var times = 100000;
for (var i = 0; i < times; i++) {
    // Finding two random numbers
    var random_w = Math.floor(Math.random() * 18) + 2;
    var random_e = Math.floor(Math.random() * 18) + 2;
    // Generate a random proper abelian subcategory from an sms.
    var sms = ncc.randomSimpleMindedSystem3(random_w, random_e);
    var A = ncc.extensionClose(sms);
    // Finding
    isMyGuessCorrect && (isMyGuessCorrect = ncc.isEn(A, random_w - 1));
    if (i % 100 == 0) {
        console.log(i);
    }
}
console.log("Is my guess correct?", isMyGuessCorrect);
