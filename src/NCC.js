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
exports.filtSub = exports.filtGen = exports.rightPerp = exports.leftPerp = exports.extension = exports.isEn = exports.randomSimpleMindedSystem = exports.randomSimpleMindedSystem3 = exports.randomSimpleMindedSystem2 = exports.extensionClose = exports.ext = exports.getDiagonalDifferenece = exports.isWDiagonal = exports.homDim = exports.Ndist = exports.isNOrdered = exports.Sigma = void 0;
var diag = require("./DiagonalCollectionFcts");
var NegativeCCDiagonalCollection_1 = require("./NegativeCCDiagonalCollection");
function Sigma(s, N, power) {
    if (N && !(s instanceof NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection) && typeof N == "number") {
        if (power === undefined) {
            power = 1;
        }
        if (!(s instanceof NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection)) {
            var n = [(s[0] + power) % N, (s[1] + power) % N];
            if (n[0] < n[1]) {
                return n;
            }
            return [n[1], n[0]];
        }
    }
    if (s instanceof NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection) {
        var objs = [];
        for (var _c = 0, _d = s.diagonals; _c < _d.length; _c++) {
            var diag_1 = _d[_c];
            objs.push(Sigma(diag_1, s.N, N)); // Notice N here is the power
        }
        var a = new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection(objs, s.w, s.e);
        return a;
    }
}
exports.Sigma = Sigma;
/**
 * is N-Cylic ordered: n1 < n2 < n3.
 *
 * @param n1 element in Z/NZ
 * @param n2 element in Z/NZ
 * @param n3 element in Z/NZ
 * @param N Number of vertices
 * @returns boolean
 */
function isNOrdered(n1, n2, n3, N) {
    var d = Ndist(n1, n3, N);
    return (Ndist(n1, n2, N) < d && Ndist(n2, n3, N) < d);
}
exports.isNOrdered = isNOrdered;
/**
 * Calculates a clock-wise "distance" from a to b.
 * Can also be seen as "distance" Z/NZ, is b-a if b is the least representative of [b], such that b>a.
 *
 * @param a element in Z/NZ
 * @param b element in Z/NZ
 * @param N Number of vertices
 * @returns {number} Distance as described above.
 */
function Ndist(a, b, N) {
    if (b == a) {
        return 0;
    }
    if (b > a) {
        return b - a;
    }
    if (b < a) {
        return N - a + b;
    }
    return -1;
}
exports.Ndist = Ndist;
/**
 * Calculates k dimension of hom space hom(s1,s2) in C_{-w}(A_e).
 *
 * @param s1 N-diagonals
 * @param s2 N-diagonals
 * @param w  w
 * @param e  e
 * @returns Dimension of hom(s1,s2) in C_{-w}(A_e)
 */
function homDim(s1, s2, w, e) {
    var N = (w + 1) * (e + 1) - 2;
    var sig = Sigma(s1, N);
    if (s1[0] === s2[0] && s1[1] === s2[1]) {
        return 1;
    }
    if (s1[0] === s2[0] && (Ndist(s1[1], s2[1], N)) % (w + 1) === 0 && !diag.isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[1] === s2[0] && (Ndist(s1[0], s2[1], N)) % (w + 1) === 0 && !diag.isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[0] === s2[1] && (Ndist(s1[1], s2[0], N)) % (w + 1) === 0 && !diag.isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[1] === s2[1] && (Ndist(s1[0], s2[0], N)) % (w + 1) === 0 && !diag.isCrossing(s2, sig)) {
        return 1;
    }
    if (diag.isCrossing(s2, sig) && diag.getSharedEndpoint(s2, s1) == -1) {
        if (isNOrdered(sig[0], sig[1], s2[0], N) && (Ndist(s2[0], sig[0], N)) % (w + 1) === 0 &&
            (Ndist(s2[1], sig[1], N)) % (w + 1) === 0) {
            return 1;
        }
        if (isNOrdered(sig[0], sig[1], s2[1], N) && (Ndist(s2[1], sig[0], N)) % (w + 1) === 0 &&
            (Ndist(s2[0], sig[1], N)) % (w + 1) === 0) {
            return 1;
        }
    }
    return 0;
}
exports.homDim = homDim;
/**
 * Checks if N-diagonal is w admissible
 *
 * @param a N-diagonal
 * @param w w
 * @returns {boolean}
 */
function isWDiagonal(a, w) {
    return (((a[1] - a[0]) + 1) % (w + 1) == 0);
}
exports.isWDiagonal = isWDiagonal;
// e's in article fig 11. 
function getDiagonalDifferenece(a, b, N) {
    var objs = [];
    var currIndex = 0;
    if (a.includes(b[currIndex])) {
        currIndex = 1;
    }
    for (var _j = currIndex; _j < 2; _j++) {
        for (var _i = b[_j] + 1; _i < b[_j] + N; _i++) {
            if (b.includes(_i % N)) {
                break;
            }
            if (a.includes(_i % N)) {
                objs.push([b[_j], _i % N].sort(function (n1, n2) { return n1 - n2; }));
                break;
            }
        }
    }
    return objs;
}
exports.getDiagonalDifferenece = getDiagonalDifferenece;
// find exts a --> b --> c, returns [b]
function ext(c, a, w, N) {
    if (diag.isCrossing(c, a) || (!diag.isCrossing(c, a) && diag.getSharedEndpoint(Sigma(a, N), c) >= 0)) {
        //There is an extension
        var diff = getDiagonalDifferenece(a, c, N);
        // Check if it is w diagonals
        if (diff.every(function (curVal) { return isWDiagonal(curVal, w); })) {
            return diff;
        }
    }
    return [];
}
exports.ext = ext;
function extensionClose(A) {
    var res = new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection(__spreadArray([], A.diagonals, true), A.w, A.e);
    var somethingAdded = false;
    while (true) {
        somethingAdded = false;
        for (var _c = 0, _d = res.diagonals; _c < _d.length; _c++) {
            var x = _d[_c];
            for (var _e = 0, _f = res.diagonals; _e < _f.length; _e++) {
                var y = _f[_e];
                if (x == y) {
                    continue;
                }
                var e = ext(x, y, A.w, A.N);
                for (var _g = 0, e_1 = e; _g < e_1.length; _g++) {
                    var z = e_1[_g];
                    if (!res.contains(z)) {
                        res.add(z);
                    }
                }
            }
        }
        if (!somethingAdded) {
            break;
        }
    }
    return res;
}
exports.extensionClose = extensionClose;
function randomSimpleMindedSystem2(w, e) {
    var N = (e + 1) * (w + 1) - 2;
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    function random_array_value(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    function numberArray(from, to) {
        return Array.from({ length: to - from + 1 }, function (_, index) { return index + from; });
    }
    var diagonals = [];
    //should be tested. and by backwards, i meen counterclockwise
    function NDistance(a, b, backwards) {
        if (backwards === void 0) { backwards = false; }
        if (!backwards) {
            if (b >= a) {
                return b - a;
            }
            if (b < a) {
                return b + N - a;
            }
        }
        if (backwards) {
            if (b >= a) {
                return a + N - b;
            }
            if (b < a) {
                return a - b;
            }
        }
    }
    function helper(subpol_diag_indexes, backwards) {
        if (subpol_diag_indexes.length == 0) {
            var diag_start = getRandomInteger(0, N - 1);
            var diag_end = (diag_start + (w + 1) * getRandomInteger(1, e)) % N; // Correct to choose e?
            diagonals.push([diag_start, diag_end].sort(function (a, b) { return a - b; }));
            helper([0], true);
            helper([0], false);
            return;
        }
        if (subpol_diag_indexes.length == 1) {
            var dist = NDistance(diagonals[subpol_diag_indexes[0]][0], diagonals[subpol_diag_indexes[0]][1], backwards);
            var num_avail = dist - 1;
            if (num_avail <= w) {
                return;
            }
            //need to be chosen smart, otherwise if not enough avail, a,b could both be 0
            var diag_start = getRandomInteger(0, num_avail - 1);
            var _a = -Math.floor((NDistance(diagonals[subpol_diag_indexes[0]][0], diag_start, backwards) - 2) / (w + 1));
            var _b = Math.floor((NDistance(diag_start, diagonals[subpol_diag_indexes[0]][1], backwards) - 2) / (w + 1));
            var diag_end_dir = getRandomInteger(_a + 1, _b);
            if (diag_end_dir == 0) {
                diag_end_dir = -1;
            }
            var diag_end = diag_start + diag_end_dir * (w + 1);
            diagonals.push([diag_start, diag_end].sort(function (a, b) { return a - b; }));
            helper([0, 1], !backwards);
            //helper([1], )
            return;
        }
    }
    return new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection([], w, e);
}
exports.randomSimpleMindedSystem2 = randomSimpleMindedSystem2;
function randomSimpleMindedSystem3(w, e) {
    var N = (e + 1) * (w + 1) - 2;
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function random_array_value(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    function numberArray(from, to) {
        return Array.from({ length: to - from + 1 }, function (_, index) { return index + from; });
    }
    function random_shuffle(array) {
        var _c;
        var currentIndex = array.length;
        var randomIndex;
        while (currentIndex > 0) {
            randomIndex = getRandomInteger(0, currentIndex);
            currentIndex -= 1;
            _c = [array[randomIndex], array[currentIndex]], array[currentIndex] = _c[0], array[randomIndex] = _c[1];
        }
        return array;
    }
    function helper(polygon, taken) {
        if (polygon.length < (w + 1) * 2 - 2) {
            return [];
        }
        var available_nodes = random_shuffle(polygon.filter(function (d) { return taken.indexOf(d) == -1; }));
        if (available_nodes.length < 2) {
            return [];
        }
        var randomized_available_nodes = random_shuffle(available_nodes);
        var random_partner = -1;
        var i = 0;
        var found_one = false;
        for (i = 0; i < randomized_available_nodes.length; i++) {
            var possiblePartners = available_nodes.filter(function (n) {
                if (n == randomized_available_nodes[i]) {
                    return false;
                }
                return (Math.abs(n - randomized_available_nodes[i]) + 1) % (w + 1) == 0;
            });
            if (possiblePartners.length == 0) {
                continue;
            }
            found_one = true;
            random_partner = random_array_value(possiblePartners);
            break;
        }
        if (random_partner == -1) {
            return [];
        }
        if (!found_one) {
            console.log("sms, something wrong");
            return [];
        }
        var diag = [randomized_available_nodes[i], random_partner].sort(function (a, b) { return a - b; });
        var pol1 = polygon.filter(function (n) {
            return isNOrdered(diag[0], diag[1], n, N) || n == diag[0] || n == diag[1];
        });
        var taken1 = taken.filter(function (n) { return pol1.indexOf(n) >= 0; });
        taken1.push(diag[0], diag[1]);
        var pol2 = polygon.filter(function (n) {
            return !isNOrdered(diag[0], diag[1], n, N) || n == diag[0] || n == diag[1];
        });
        var taken2 = taken.filter(function (n) { return pol2.indexOf(n) >= 0; });
        taken2.push(diag[0], diag[1]);
        return __spreadArray(__spreadArray([diag], helper(pol1, taken1), true), helper(pol2, taken2), true);
    }
    var h = helper(numberArray(0, N - 1), []);
    return new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection(h, w, e);
}
exports.randomSimpleMindedSystem3 = randomSimpleMindedSystem3;
function randomSimpleMindedSystem(w, e, num_attempts) {
    if (num_attempts === void 0) { num_attempts = 10; }
    var N = (e + 1) * (w + 1) - 2;
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    function helper(start, end, first) {
        if ((end - start + 1) < (w + 1)) {
            return [];
        }
        var l = getRndInteger(start, start + w - 1);
        if (first) {
            l = 0;
        }
        var random_length = getRndInteger(1, Math.floor((end - l + 1) / (w + 1)) + 1) * (w + 1);
        var endPoint = random_length - 1 + l;
        return __spreadArray(__spreadArray([[l, endPoint]], helper(l + 1, endPoint - 1, false), true), helper(endPoint + 1, end, false), true);
    }
    for (var i = 0; i < num_attempts; i++) {
        var sms = new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection(helper(0, N - 1, true), w, e);
        if (sms.isSimpleMindedSystem()) {
            return sms;
        }
    }
    console.log("NOT SMS");
    return null;
}
exports.randomSimpleMindedSystem = randomSimpleMindedSystem;
// Need test
/**
 * Is the hom space between two colletions non-zero
 *
 * @param A Collection of N-diagonals
 * @param B Collection of N-diagonals
 * @returns boolean
*/
function isHomBetweenCollections(from, to) {
    for (var _c = 0, _d = from.diagonals; _c < _d.length; _c++) {
        var x = _d[_c];
        for (var _e = 0, _f = to.diagonals; _e < _f.length; _e++) {
            var y = _f[_e];
            if (homDim(x, y, from.w, to.e) > 0) {
                return true;
            }
        }
    }
    return false;
}
// Need test
function isEn(coll, n) {
    var a = new NegativeCCDiagonalCollection_1.NegativeCCDiagonalCollection(coll.diagonals, coll.w, coll.e);
    for (var i = 0; i < n; i++) {
        a = Sigma(a);
        if (isHomBetweenCollections(a, coll)) {
            return false;
        }
    }
    return true;
}
exports.isEn = isEn;
function extension(A, B) {
    var a = diag.union(A, B);
    for (var _c = 0, _d = A.diagonals; _c < _d.length; _c++) {
        var x = _d[_c];
        for (var _e = 0, _f = B.diagonals; _e < _f.length; _e++) {
            var y = _f[_e];
            if (diag.diagonalEqual(x, y)) {
                continue;
            }
            // Find e's such that: x ---> e ---> y, or rather a ---> e ---> b
            var e = ext(y, x, A.w, A.N);
            for (var _g = 0, e_2 = e; _g < e_2.length; _g++) {
                var z = e_2[_g];
                if (!a.contains(z)) {
                    a.add(z);
                }
            }
        }
    }
    return a;
}
exports.extension = extension;
function leftPerp(of, inColl) {
    return inColl.clone(function (diag) {
        for (var _c = 0, _d = of.diagonals; _c < _d.length; _c++) {
            var ofDiag = _d[_c];
            if (homDim(diag, ofDiag, inColl.w, inColl.e) > 0) {
                return false;
            }
        }
        return true;
    });
}
exports.leftPerp = leftPerp;
// Set^perp
function rightPerp(of, inColl) {
    return inColl.clone(function (diag) {
        for (var _c = 0, _d = of.diagonals; _c < _d.length; _c++) {
            var ofDiag = _d[_c];
            if (homDim(ofDiag, diag, inColl.w, inColl.e) > 0) {
                return false;
            }
        }
        return true;
    });
}
exports.rightPerp = rightPerp;
function filtGen(set, alg) {
    return leftPerp(rightPerp(set, alg), alg);
}
exports.filtGen = filtGen;
function filtSub(set, alg) {
    return rightPerp(leftPerp(set, alg), alg);
}
exports.filtSub = filtSub;
