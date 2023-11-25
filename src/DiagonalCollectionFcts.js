"use strict";
exports.__esModule = true;
exports.subtract = exports.intersect = exports.union = exports.getSharedEndpoint = exports.isCrossing = exports.diagonalEqual = void 0;
function diagonalEqual(a, b) {
    return a[0] == b[0] && a[1] == b[1];
}
exports.diagonalEqual = diagonalEqual;
/**
 * Checks if two N-diagonals are crossing.
 *
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {boolean} is crossing
 */
function isCrossing(a, b) {
    return !(a[0] >= b[1] || a[1] <= b[0] || (a[1] <= b[1] && a[0] >= b[0]) || (b[1] <= a[1] && b[0] >= a[0]));
}
exports.isCrossing = isCrossing;
/**
 * Gets a shared endpoint of N-diagonals if exists, otherwise -1:
 *
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {number} shared endpoint
 */
function getSharedEndpoint(a, b) {
    if (a[0] == b[0] || a[0] == b[1]) {
        return a[0];
    }
    if (a[1] == b[0] || a[1] == b[1]) {
        return a[1];
    }
    return -1;
}
exports.getSharedEndpoint = getSharedEndpoint;
function union() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length == 0) {
        return null;
    }
    if (args.length == 1) {
        return args[0];
    }
    var unionColl = args[0].clone();
    for (var i = 1; i < args.length; i++) {
        for (var _a = 0, _b = args[i].diagonals; _a < _b.length; _a++) {
            var v = _b[_a];
            if (!unionColl.contains(v)) {
                unionColl.add(v);
            }
        }
    }
    return unionColl;
}
exports.union = union;
function intersect() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length == 0) {
        return null;
    }
    if (args.length == 1) {
        return args[0];
    }
    return args[0].clone(function (diag) {
        for (var i = 1; i < args.length; i++) {
            if (!args[i].contains(diag)) {
                return false;
            }
        }
        return true;
    });
}
exports.intersect = intersect;
// A - B
function subtract(A, B) {
    return A.clone(function (diag) { return !B.contains(diag); });
}
exports.subtract = subtract;
