"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.DiagonalCollection = void 0;
var DiagonalCollection = /** @class */ (function () {
    function DiagonalCollection(objs) {
        this.diagonals = [];
        for (var _a = 0, objs_1 = objs; _a < objs_1.length; _a++) {
            var k = objs_1[_a];
            this.add(k);
        }
    }
    DiagonalCollection.prototype.clone = function (filter) {
        if (filter === void 0) { filter = function () { return true; }; }
        return new this.constructor(__spreadArray([], this.diagonals, true).filter(filter));
    };
    DiagonalCollection.prototype.toString = function () {
        return this.diagonals.map(function (a) { return "(" + a.toString() + ")"; }).toString();
    };
    DiagonalCollection.prototype.add = function (obj) {
        this.diagonals.push(obj);
    };
    DiagonalCollection.prototype.containsSet = function (objs) {
        for (var _a = 0, objs_2 = objs; _a < objs_2.length; _a++) {
            var v = objs_2[_a];
            if (!this.contains(v)) {
                return false;
            }
        }
        return true;
    };
    DiagonalCollection.prototype.contains = function (obj) {
        var i = this.find(obj);
        if (i < 0) {
            return null;
        }
        return this.diagonals[i];
    };
    // Returns index
    DiagonalCollection.prototype.find = function (obj) {
        for (var _i = 0; _i < this.diagonals.length; _i++) {
            if (this.diagonals[_i][0] == obj[0] && this.diagonals[_i][1] == obj[1]) {
                return _i;
            }
        }
        return -1;
    };
    DiagonalCollection.prototype.removeIndex = function (index) { };
    DiagonalCollection.prototype.removeObject = function (index) { };
    DiagonalCollection.prototype.equal = function (A) {
        return this.containsSet(A.diagonals) && A.containsSet(this.diagonals);
    };
    DiagonalCollection.prototype.isExtensionClosed = function () {
        return this.equal(this.extensionClose());
    };
    DiagonalCollection.prototype.extensionClose = function () {
        console.warn("Not implemented! Not relavant now");
        return null;
    };
    return DiagonalCollection;
}());
exports.DiagonalCollection = DiagonalCollection;
