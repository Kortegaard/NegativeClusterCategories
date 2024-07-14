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
exports.tilt = exports.findRandomTorsionFreeClass = exports.filtSub = exports.filtGen = exports.rightPerp = exports.leftPerp = exports.extension = exports.isEn = exports.isHomBetweenCollections = exports.randomSimpleMindedSystem = exports.extensionClose = exports.ext = exports.getDiagonalDifferenece = exports.isWDiagonal = exports.homDim = exports.Ndist = exports.isNOrdered = exports.Sigma = void 0;
var diag = require("./DiagonalCollectionFcts");
var NegativeCCDiagonalCollection_1 = require("./NegativeCCDiagonalCollection");
function Sigma(s, N, power) {
    if (N && !(s instanceof NegativeCCDiagonalCollection_1.NCCDiagonalCollection) && typeof N == "number") {
        if (power === undefined) {
            power = 1;
        }
        if (!(s instanceof NegativeCCDiagonalCollection_1.NCCDiagonalCollection)) {
            var n = [(s[0] + power) % N, (s[1] + power) % N];
            if (n[0] < n[1]) {
                return n;
            }
            return [n[1], n[0]];
        }
    }
    if (s instanceof NegativeCCDiagonalCollection_1.NCCDiagonalCollection) {
        var objs = [];
        for (var _a = 0, _b = s.diagonals; _a < _b.length; _a++) {
            var diag_1 = _b[_a];
            objs.push(Sigma(diag_1, s.N, N)); // Notice N here is the power
        }
        var a = new NegativeCCDiagonalCollection_1.NCCDiagonalCollection(objs, s.w, s.e);
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
    var res = new NegativeCCDiagonalCollection_1.NCCDiagonalCollection(__spreadArray([], A.diagonals, true), A.w, A.e);
    var somethingAdded = false;
    while (true) {
        somethingAdded = false;
        for (var _a = 0, _b = res.diagonals; _a < _b.length; _a++) {
            var x = _b[_a];
            for (var _c = 0, _d = res.diagonals; _c < _d.length; _c++) {
                var y = _d[_c];
                if (x == y) {
                    continue;
                }
                var e = ext(x, y, A.w, A.N);
                for (var _e = 0, e_1 = e; _e < e_1.length; _e++) {
                    var z = e_1[_e];
                    if (!res.contains(z)) {
                        res.add(z);
                        somethingAdded = true;
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
    var _a;
    var currentIndex = array.length;
    var randomIndex;
    while (currentIndex > 0) {
        randomIndex = getRandomInteger(0, currentIndex);
        currentIndex -= 1;
        _a = [array[randomIndex], array[currentIndex]], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
}
function randomSimpleMindedSystem(w, e) {
    var N = (e + 1) * (w + 1) - 2;
    function helper(polygon, taken) {
        // checks if there is enoguh space to have a diagonal
        if (polygon.length < (w + 1) * 2 - 2) {
            return [];
        }
        // Find all the vertices in `polygon` that are not already 
        // enpoints of diagonals
        var available_nodes = random_shuffle(polygon.filter(function (d) { return taken.indexOf(d) == -1; }));
        if (available_nodes.length < 2) {
            return [];
        }
        // Shuffles available vertices, to randomize pick of diagonal
        var randomized_available_nodes = random_shuffle(available_nodes);
        var random_partner = -1;
        var i = 0;
        var found_one = false;
        // Goes throguh each of the available vertices, and try to match it 
        // with another vertex to construct a diagonal
        for (i = 0; i < randomized_available_nodes.length; i++) {
            // Find possible partners to construct a diagonal with 
            // randomized_available_nodes[i]
            var possiblePartners = available_nodes.filter(function (n) {
                if (n == randomized_available_nodes[i]) {
                    return false;
                }
                return (Math.abs(n - randomized_available_nodes[i]) + 1) % (w + 1) == 0;
            });
            if (possiblePartners.length == 0) {
                continue;
            }
            // Picks a random partner
            found_one = true;
            random_partner = random_array_value(possiblePartners);
            break;
        }
        if (random_partner == -1) {
            return [];
        }
        if (!found_one) {
            console.log("error: Diagonal not found");
            return [];
        }
        // The chosen random diagonal
        var diag = [randomized_available_nodes[i], random_partner].sort(function (a, b) { return a - b; });
        // Splitting the polygon up into two part, 
        // one on each side of the diagonal
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
        // recursivly finding diagonal in the two parts the polygon is split into
        return __spreadArray(__spreadArray([diag], helper(pol1, taken1), true), helper(pol2, taken2), true);
    }
    var h = helper(numberArray(0, N - 1), []);
    return new NegativeCCDiagonalCollection_1.NCCDiagonalCollection(h, w, e);
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
    for (var _a = 0, _b = from.diagonals; _a < _b.length; _a++) {
        var x = _b[_a];
        for (var _c = 0, _d = to.diagonals; _c < _d.length; _c++) {
            var y = _d[_c];
            if (homDim(x, y, from.w, to.e) > 0) {
                return true;
            }
        }
    }
    return false;
}
exports.isHomBetweenCollections = isHomBetweenCollections;
// Need test
function isEn(coll, n) {
    var a = new NegativeCCDiagonalCollection_1.NCCDiagonalCollection(coll.diagonals, coll.w, coll.e);
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
    for (var _a = 0, _b = A.diagonals; _a < _b.length; _a++) {
        var x = _b[_a];
        for (var _c = 0, _d = B.diagonals; _c < _d.length; _c++) {
            var y = _d[_c];
            if (diag.diagonalEqual(x, y)) {
                continue;
            }
            // Find e's such that: x ---> e ---> y, or rather a ---> e ---> b
            var e = ext(y, x, A.w, A.N);
            for (var _e = 0, e_2 = e; _e < e_2.length; _e++) {
                var z = e_2[_e];
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
        for (var _a = 0, _b = of.diagonals; _a < _b.length; _a++) {
            var ofDiag = _b[_a];
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
        for (var _a = 0, _b = of.diagonals; _a < _b.length; _a++) {
            var ofDiag = _b[_a];
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
function findRandomTorsionFreeClass(alg) {
    var num = Math.floor(Math.random() * alg.diagonals.length + 1);
    var shuffled = alg.diagonals.sort(function () { return 0.5 - Math.random(); });
    var selected = shuffled.slice(0, num);
    return filtSub(new NegativeCCDiagonalCollection_1.NCCDiagonalCollection(selected, alg.w, alg.e), alg);
}
exports.findRandomTorsionFreeClass = findRandomTorsionFreeClass;
function tilt(alg, torsionFree) {
    var torsion = leftPerp(torsionFree, alg);
    return extension(Sigma(torsionFree), torsion);
}
exports.tilt = tilt;
