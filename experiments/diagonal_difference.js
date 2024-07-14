"use strict";
exports.__esModule = true;
var ncc = require("../src/NCC");
var nc = require("../src/NegativeCCDiagonalCollection");
var A = new nc.NCCDiagonalCollection([[1, 4], [1, 8], [1, 12], [5, 8], [5, 12], [9, 12]], 3, 4);
var X = new nc.NCCDiagonalCollection([[1, 4], [1, 8]], 3, 4);
console.log(ncc.tilt(A, X));
