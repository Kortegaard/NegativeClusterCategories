"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.ext2Agree = exports.isEn = exports.randomSimpleMindedSystem = exports.qpaTorsionClasses = exports.dimensionVectorToObject = exports.qpa = exports.generateIndecomposables = exports.pathAlgebra = exports.pathAlgebraFromPasc = exports.pathAlgebraOld = exports.extension = exports.collectionEqual = exports.union = exports.intersection = exports.filtSub = exports.filtGen = exports.CwObjectCollection = exports.rightPerpInCollection = exports.leftPerpInCollection = exports.objectEqual = exports.ext = exports.getDiagonalDifferenece = exports.isHomBetweenCollections = exports.isWDiagonal = exports.getSharedEndpoint = exports.isCrossing = exports.homDim = exports.Ndist = exports.isNOrdered = exports.Sigma = exports.setVerbose = exports.verbose = void 0;
exports.verbose = true;
function setVerbose(val) { exports.verbose = val; }
exports.setVerbose = setVerbose;
/**
 * Suspension of N-diagonal.
 *
 * @param s : N-Diagonal
 * @param N : Number of vertices
 * @returns ∑s
 */
function Sigma(s, N, power) {
    if (power === void 0) { power = 1; }
    if (power === undefined) {
        power = 1;
    }
    var n = [(s[0] + power) % N, (s[1] + power) % N];
    if (n[0] < n[1]) {
        return n;
    }
    return [n[1], n[0]];
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
    console.error("you screwed something up");
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
    if (s1[0] === s2[0] && (Ndist(s1[1], s2[1], N)) % (w + 1) === 0 && !isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[1] === s2[0] && (Ndist(s1[0], s2[1], N)) % (w + 1) === 0 && !isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[0] === s2[1] && (Ndist(s1[1], s2[0], N)) % (w + 1) === 0 && !isCrossing(s2, sig)) {
        return 1;
    }
    if (s1[1] === s2[1] && (Ndist(s1[0], s2[0], N)) % (w + 1) === 0 && !isCrossing(s2, sig)) {
        return 1;
    }
    if (isCrossing(s2, sig) && getSharedEndpoint(s2, s1) == -1) {
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
    if (a[0] == b[0]) {
        return a[0];
    }
    if (a[0] == b[1]) {
        return a[0];
    }
    if (a[1] == b[0]) {
        return a[1];
    }
    if (a[1] == b[1]) {
        return a[1];
    }
    return -1;
}
exports.getSharedEndpoint = getSharedEndpoint;
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
/**
 * Is the hom space between two colletions non-zero
 *
 * @param A Collection of N-diagonals
 * @param B Collection of N-diagonals
 * @returns boolean
*/
function isHomBetweenCollections(A, B) {
    for (var _a = 0, _b = A.objectList; _a < _b.length; _a++) {
        var x = _b[_a];
        for (var _c = 0, _d = B.objectList; _c < _d.length; _c++) {
            var y = _d[_c];
            if (homDim(x, y, A.w, A.e) > 0) {
                return true;
            }
        }
    }
    return false;
}
exports.isHomBetweenCollections = isHomBetweenCollections;
// e's in article fig 11. 
// Doesnt check if w-diagonal
function getDiagonalDifferenece(a, b, N) {
    var objs = [];
    var currIndex = 0;
    if (a.includes(b[currIndex])) {
        currIndex = 1;
    }
    // NCH.ext([4,11],[0,7]);
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
    if (isCrossing(c, a) || (!isCrossing(c, a) && getSharedEndpoint(Sigma(a, N), c) >= 0)) {
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
function objectEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
exports.objectEqual = objectEqual;
// ^{perp}set
function leftPerpInCollection(set, inColl) {
    var perp = [];
    for (var _a = 0, _b = inColl.objectList; _a < _b.length; _a++) {
        var collElem = _b[_a];
        var is_zero = true;
        for (var _c = 0, _d = set.objectList; _c < _d.length; _c++) {
            var setElem = _d[_c];
            if (homDim(collElem, setElem, inColl.w, inColl.e) > 0) {
                is_zero = false;
            }
        }
        if (is_zero) {
            perp.push(collElem);
        }
    }
    return new CwObjectCollection(perp, inColl.w, inColl.e);
}
exports.leftPerpInCollection = leftPerpInCollection;
// Set^perp
function rightPerpInCollection(set, inColl) {
    var perp = [];
    for (var _a = 0, _b = inColl.objectList; _a < _b.length; _a++) {
        var collElem = _b[_a];
        var is_zero = true;
        for (var _c = 0, _d = set.objectList; _c < _d.length; _c++) {
            var setElem = _d[_c];
            if (homDim(setElem, collElem, inColl.w, inColl.e) > 0) {
                is_zero = false;
            }
        }
        if (is_zero) {
            perp.push(collElem);
        }
    }
    return new CwObjectCollection(perp, inColl.w, inColl.e);
}
exports.rightPerpInCollection = rightPerpInCollection;
var CwObjectCollection = /** @class */ (function () {
    function CwObjectCollection(objs, w, e) {
        this.objectList = [];
        this.w = 0;
        this.e = 0;
        this.N = 0;
        this.w = w;
        this.e = e;
        this.N = (w + 1) * (e + 1) - 2;
        for (var _a = 0, objs_1 = objs; _a < objs_1.length; _a++) {
            var k = objs_1[_a];
            this.add(k);
        }
    }
    CwObjectCollection.prototype.toString = function () {
        return this.objectList.map(function (a) { return "(" + a.toString() + ")"; }).toString();
    };
    CwObjectCollection.prototype.add = function (obj) {
        this.objectList.push(obj);
    };
    CwObjectCollection.prototype.containsSet = function (objs) {
        for (var _a = 0, objs_2 = objs; _a < objs_2.length; _a++) {
            var v = objs_2[_a];
            if (!this.contains(v)) {
                return false;
            }
        }
        return true;
    };
    CwObjectCollection.prototype.contains = function (obj) {
        var i = this.find(obj);
        if (i < 0) {
            return null;
        }
        return this.objectList[i];
    };
    // Returns index
    CwObjectCollection.prototype.find = function (obj) {
        for (var _i = 0; _i < this.objectList.length; _i++) {
            if (this.objectList[_i][0] == obj[0] && this.objectList[_i][1] == obj[1]) {
                return _i;
            }
        }
        return -1;
    };
    CwObjectCollection.prototype.removeIndex = function (index) { };
    CwObjectCollection.prototype.removeObject = function (index) { };
    CwObjectCollection.prototype.isSimpleMindedSystem = function () {
        //if(this.objectList.length != this.e){
        //    return false;
        //}
        for (var _i = 0; _i < this.objectList.length; _i++) {
            for (var _j = _i + 1; _j < this.objectList.length; _j++) {
                if (this.objectList[_i][0] == this.objectList[_j][0] ||
                    this.objectList[_i][1] == this.objectList[_j][0] ||
                    this.objectList[_i][1] == this.objectList[_j][1] ||
                    this.objectList[_i][0] == this.objectList[_j][1]) {
                    return false;
                }
                if (isCrossing(this.objectList[_i], this.objectList[_j])) {
                    return false;
                }
            }
        }
        return true;
    };
    CwObjectCollection.prototype.isExtensionClosed = function () {
        return collectionEqual(this, this.extensionClose());
    };
    CwObjectCollection.prototype.extensionClose = function () {
        var a = new CwObjectCollection(this.objectList, this.w, this.e);
        var somethingAdded = false;
        while (true) {
            somethingAdded = false;
            for (var _a = 0, _b = a.objectList; _a < _b.length; _a++) {
                var x = _b[_a];
                for (var _c = 0, _d = a.objectList; _c < _d.length; _c++) {
                    var y = _d[_c];
                    if (x == y) {
                        continue;
                    }
                    var e = ext(x, y, this.w, this.N);
                    for (var _e = 0, e_1 = e; _e < e_1.length; _e++) {
                        var z = e_1[_e];
                        if (!a.contains(z)) {
                            a.add(z);
                        }
                    }
                }
            }
            if (!somethingAdded) {
                break;
            }
        }
        return a;
    };
    // todo: rewrite to proper mutate
    //st torsionfree class 
    CwObjectCollection.prototype.mutate = function (torsionFree) {
        // torsion = ^perp st = leftperp(st)
        var torsion = leftPerpInCollection(torsionFree, this);
        //let a: CwObjectCollection = new CwObjectCollection([], this.w, this.e);
        // for(let ob of this.objectList){
        //if(!st.contains(ob)){
        //a.add(ob as [number, number]);
        //}else{
        //a.add(Sigma(ob, this.N) as [number, number]);
        //}
        //}
        return extension(torsionFree.Sigma(), torsion);
    };
    CwObjectCollection.prototype.tilt = function (torsionFree) {
        var torsion = leftPerpInCollection(torsionFree, this);
        return extension(torsionFree.Sigma(), torsion);
    };
    CwObjectCollection.prototype.Sigma = function (power) {
        if (power === void 0) { power = 1; }
        var a = new CwObjectCollection([], this.w, this.e);
        for (var _a = 0, _b = this.objectList; _a < _b.length; _a++) {
            var ob = _b[_a];
            a.add(Sigma(ob, this.N, power));
        }
        return a;
    };
    return CwObjectCollection;
}());
exports.CwObjectCollection = CwObjectCollection;
function filtGen(set, alg) {
    return leftPerpInCollection(rightPerpInCollection(set, alg), alg);
}
exports.filtGen = filtGen;
function filtSub(set, alg) {
    return rightPerpInCollection(leftPerpInCollection(set, alg), alg);
}
exports.filtSub = filtSub;
function intersection(A, B) {
    if (A.w != B.w || A.e != B.e) {
        console.warn("Collection doesn't compare");
        return null;
    }
    var collectedObjs = [];
    for (var _a = 0, _b = A.objectList; _a < _b.length; _a++) {
        var v = _b[_a];
        if (B.contains(v)) {
            collectedObjs.push(v);
        }
    }
    var a = new CwObjectCollection(collectedObjs, A.w, A.e);
    return a;
}
exports.intersection = intersection;
function union(A, B) {
    if (A.w != B.w || A.e != B.e) {
        console.warn("Collection doesn't compare");
        return null;
    }
    var collectedObjs = __spreadArray([], A.objectList, true);
    for (var _a = 0, _b = B.objectList; _a < _b.length; _a++) {
        var v = _b[_a];
        if (!A.contains(v)) {
            collectedObjs.push(v);
        }
    }
    var a = new CwObjectCollection(collectedObjs, A.w, A.e);
    return a;
}
exports.union = union;
function collectionEqual(A, B) {
    return A.containsSet(B.objectList) && B.containsSet(A.objectList);
}
exports.collectionEqual = collectionEqual;
// Compute A * B
function extension(A, B) {
    var a = union(A, B);
    if (a === null) {
        return null;
    }
    for (var _a = 0, _b = A.objectList; _a < _b.length; _a++) {
        var x = _b[_a];
        for (var _c = 0, _d = B.objectList; _c < _d.length; _c++) {
            var y = _d[_c];
            if (objectEqual(x, y)) {
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
function pathAlgebraOld(sms) {
    if (!sms.isSimpleMindedSystem()) {
        return null;
    }
    var ideal = [];
    var arrows = [];
    var compositions = [];
    var composition_module = [];
    // Create list of arrows
    var _hd = 0;
    for (var _i = 0; _i < sms.objectList.length; _i++) {
        for (var _j = 0; _j < sms.objectList.length; _j++) {
            // Arros from _i to _j
            _hd = homDim(sms.objectList[_j], Sigma(sms.objectList[_i], sms.N), sms.w, sms.e);
            for (var _k = 0; _k < _hd; _k++) {
                //arrows.push([_i, _j]);
                arrows.push([_i, _j]);
            }
        }
    }
    // Create list of ideals
    var tempIndex = 0;
    for (var _i = 0; _i < arrows.length; _i++) {
        var e1 = ext(sms.objectList[arrows[_i][1]], sms.objectList[arrows[_i][0]], sms.w, sms.N);
        if (e1.length == 1) {
            compositions.push([_i]);
            composition_module.push(e1[0]);
        }
        else {
            console.log("There Is Some Kind Of ERROR");
        }
    }
    //let e1 = ext(object, sms.objectList[i],sms.w,sms.N);
    //let e2 = ext(sms.objectList[i], object,sms.w,sms.N);
    //if(e1.length + e2.length != 1){
    //    //console.warn("SOMETHING WRONG", e1, e2);
    //    continue;
    //}
    //if(e1.length == 1){
    //    object = e1[0];
    //}else if(e2.length == 1){
    //    object = e2[0];
    //}
    // Calculating zero relations / Ideal
    while (tempIndex != compositions.length) {
        //console.log(temIndex, compositions.length);
        for (var _i = 0; _i < arrows.length; _i++) {
            for (var _j = tempIndex; _j < compositions.length; _j++) {
                tempIndex = _j + 1;
                if (arrows[_i][1] != arrows[compositions[_j][0]][0]) {
                    continue;
                }
                // j*i makes sense:, check jf 
                // arrows[_i][0]  -- i --> arrows[_i][1]  -- j --> arrows[compositions[_j].last][1]
                // is non-zero
                var newComp = __spreadArray([_i], compositions[_j], true);
                //Composition makes sense, i.e. enpoint of arrow equal start of composition
                if (sms.objectList[compositions[_j][0]] == sms.objectList[arrows[_i][1]]) {
                    var e2 = ext(composition_module[_j], composition_module[_i], sms.w, sms.N);
                    if (e2.length == 0) {
                        //Composition of arrows is 0
                        ideal.push(newComp);
                    }
                    if (e2.length == 1) {
                        // Composition exists, and i non-zero
                        compositions.push(newComp);
                    }
                    if (e2.length > 1) {
                        console.log("Something went wrong");
                    }
                }
                //if(homDim(
                //    sms.objectList[arrows[compositions[_j][compositions[_j].length - 1]][1]],
                //    Sigma(sms.objectList[arrows[_i][0]],
                //sms.N), sms.w, sms.e)){
                //    // composition is non-zero
                //    compositions.push(newComp);
                //}else{
                //    // composition is zero
                //    ideal.push(newComp);
                //}
            }
        }
    }
    return [arrows, ideal];
}
exports.pathAlgebraOld = pathAlgebraOld;
function pathAlgebraFromPasc(pasc) {
    // We can find potential projectives as objects with no extensions out
    var potentialProjectives = [];
    // Finding projectives
    for (var _i = 0; _i < pasc.objectList.length; _i++) {
        //const ob = new CwObjectCollection([pasc.objectList[_i]], pasc.w, pasc.e)
        var are_ext_out = false;
        for (var _j = 0; _j < pasc.objectList.length; _j++) {
            var exts = ext(pasc.objectList[_i], pasc.objectList[_j], pasc.w, pasc.N);
            if (exts.length > 0) {
                are_ext_out = true;
                break;
            }
        }
        if (are_ext_out) {
            continue;
        }
        potentialProjectives.push(pasc.objectList[_i]);
    }
    //finding arrows
    var arrows = [];
    for (var _i = 0; _i < potentialProjectives.length; _i++) {
        for (var _j = 0; _j < potentialProjectives.length; _j++) {
            if (_i == _j) {
                continue;
            }
            var hd_i_j = homDim(potentialProjectives[_i], potentialProjectives[_j], pasc.w, pasc.e);
            if (hd_i_j > 0) {
                var factors = false;
                for (var _k = 0; _k < potentialProjectives.length; _k++) {
                    if (_k == _i || _k == _j) {
                        continue;
                    }
                    var hd_i_k = homDim(potentialProjectives[_i], potentialProjectives[_k], pasc.w, pasc.e);
                    var hd_k_j = homDim(potentialProjectives[_k], potentialProjectives[_j], pasc.w, pasc.e);
                    if (hd_i_k > 0 && hd_k_j > 0) {
                        factors = true;
                        break;
                    }
                }
                if (!factors) {
                    arrows.push([_j, _i]);
                }
            }
        }
    }
    //finding Zero relations
    var compositions = [];
    var curr_index = 0;
    var ideal = [];
    // Add initiial arrows
    for (var i = 0; i < arrows.length; i++) {
        compositions.push([i]);
    }
    while (curr_index < compositions.length) {
        for (var i = 0; i < arrows.length; i++) {
            // Making sure composition is possible , x --f--> y --g--> z , gives  P(x) <--p(f)-- p(y) <--p(g)-- p(z)
            if (arrows[compositions[curr_index][compositions[curr_index].length - 1]][1] != arrows[i][0]) {
                continue;
            }
            var x_index = arrows[compositions[curr_index][compositions[curr_index].length - 1]][0];
            var y_index = arrows[compositions[curr_index][compositions[curr_index].length - 1]][1];
            var z_index = arrows[i][1];
            var x = potentialProjectives[x_index];
            var z = potentialProjectives[z_index];
            var comp_homdim = homDim(z, x, pasc.w, pasc.e);
            if (comp_homdim == 0) {
                ideal.push(__spreadArray(__spreadArray([], compositions[curr_index], true), [i], false));
            }
            else {
                //compositions[curr_index].push(i)
                compositions.push(__spreadArray(__spreadArray([], compositions[curr_index], true), [i], false));
            }
        }
        curr_index += 1;
    }
    // Finding the corresponding simples
    // There will be a simple for each projective,
    // and it will be the objects that has arrows from one and only that corresponding projective
    // todo: I think the above is true
    //This can be improved, but something fast for proof of concept
    var proj_corresponding_simples = {};
    for (var i = 0; i < pasc.objectList.length; i++) {
        var has_morphisms_from = [];
        for (var j = 0; j < potentialProjectives.length; j++) {
            var hd = homDim(potentialProjectives[j], pasc.objectList[i], pasc.w, pasc.e);
            if (hd > 0) {
                has_morphisms_from.push(j);
            }
        }
        if (has_morphisms_from.length == 1) {
            if (has_morphisms_from[0] in proj_corresponding_simples) {
                console.log("something wrong here");
            }
            proj_corresponding_simples[has_morphisms_from[0]] = pasc.objectList[i];
        }
    }
    var sms_objects = [];
    for (var a in proj_corresponding_simples) {
        sms_objects.push(proj_corresponding_simples[a]);
    }
    var sms = new CwObjectCollection(sms_objects, pasc.w, pasc.e);
    return [arrows, ideal, sms];
}
exports.pathAlgebraFromPasc = pathAlgebraFromPasc;
function pathAlgebra(sms) {
    if (!sms.isSimpleMindedSystem()) {
        return null;
    }
    var ideal = [];
    var arrows = [];
    var compositions = [];
    var composition_module = [];
    // Create list of arrows
    var _hd = 0;
    for (var _i = 0; _i < sms.objectList.length; _i++) {
        for (var _j = 0; _j < sms.objectList.length; _j++) {
            // Arros from _i to _j
            _hd = homDim(sms.objectList[_j], Sigma(sms.objectList[_i], sms.N), sms.w, sms.e);
            for (var _k = 0; _k < _hd; _k++) {
                //arrows.push([_i, _j]);
                arrows.push([_j, _i]);
            }
        }
    }
    // Start composition list wiht arrows
    var tempIndex = 0;
    for (var _i = 0; _i < arrows.length; _i++) {
        var e1 = ext(sms.objectList[arrows[_i][0]], sms.objectList[arrows[_i][1]], sms.w, sms.N);
        if (e1.length == 1) {
            compositions.push([_i]);
            composition_module.push(e1[0]);
        }
        else {
            console.log("There Is Some Kind Of ERROR");
        }
    }
    // Calculating zero relations / Ideal
    while (tempIndex != compositions.length) {
        //console.log(temIndex, compositions.length);
        var cl = compositions.length;
        for (var _i = 0; _i < arrows.length; _i++) {
            for (var _j = tempIndex; _j < compositions.length; _j++) {
                // Make sure endpoint agree
                if (arrows[_i][1] != arrows[compositions[_j][0]][0]) {
                    continue;
                }
                // j*i makes sense:, check jf 
                // arrows[_i][0]  -- i --> arrows[_i][1]  -- j --> arrows[compositions[_j].last][1]
                // is non-zero
                var newComp = __spreadArray([_i], compositions[_j], true);
                // PROBLEM : ONLY WORK FOR An
                var e2 = ext(composition_module[_i], composition_module[_j], sms.w, sms.N);
                if (e2.length == 0) {
                    //Composition of arrows is 0
                    ideal.push(newComp);
                }
                if (e2.length >= 1) {
                    // Composition exists, and i non-zero
                    compositions.push(newComp);
                }
            }
        }
        tempIndex = cl;
    }
    return [arrows, ideal];
}
exports.pathAlgebra = pathAlgebra;
function generateIndecomposables(w, e) {
    var N, i, j, add;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                N = (e + 1) * (w + 1) - 2;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < N)) return [3 /*break*/, 6];
                j = 1;
                _a.label = 2;
            case 2:
                if (!(j < (e + 1))) return [3 /*break*/, 5];
                add = j * (w + 1);
                return [4 /*yield*/, [i, (i - 1 + add) % N].sort(function (n1, n2) { return n1 - n2; })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                j++;
                return [3 /*break*/, 2];
            case 5:
                i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}
exports.generateIndecomposables = generateIndecomposables;
function elements() {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, i++];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
// Arrows 0 indexes
function qpa(numVertices, arrows, ideal) {
    var out = "Read(\"./SupportTauTiltingMutation.g\");\n";
    var arrString = "[" + arrows.map(function (d, i) { return "[" + d.map(function (b) { return (b + 1); }).toString() + ", \"a" + i + "\"]"; }).toString() + "]";
    out += "Q := Quiver(" + numVertices + ", " + arrString + ");\n";
    out += "kQ := PathAlgebra(GF(3), Q);\n";
    out += "I := Ideal(kQ, [" + ideal.map(function (d) { return d.map(function (b) { return "kQ.a" + b; }).join("*"); }).join(",") + "]);\n";
    out += "IsAdmissibleIdeal(I);\n";
    out += "A := kQ/I;\n";
    out += "Display(TorsionFreeClasses(A));\n";
    return out;
}
exports.qpa = qpa;
function dimensionVectorToObject(sms, dimensionvect) {
    var object = null;
    //console.log(objectVec);
    var somethingHappening = true;
    while (dimensionvect.some(function (v) { return v != 0; })) {
        if (!somethingHappening) {
            //console.log("something went realy wrong");
            //break;
        }
        somethingHappening = false;
        for (var i = 0; i < dimensionvect.length; i++) {
            if (dimensionvect[i] != 1) {
                continue;
            }
            if (object == null) {
                object = sms.objectList[i];
                dimensionvect[i] = 0;
                continue;
            }
            var e1 = ext(object, sms.objectList[i], sms.w, sms.N);
            var e2 = ext(sms.objectList[i], object, sms.w, sms.N);
            if (e1.length + e2.length != 1) {
                //console.warn("SOMETHING WRONG", e1, e2);
                continue;
            }
            if (e1.length == 1) {
                object = e1[0];
            }
            else if (e2.length == 1) {
                object = e2[0];
            }
            somethingHappening = true;
            dimensionvect[i] = 0;
        }
    }
    return object;
}
exports.dimensionVectorToObject = dimensionVectorToObject;
function qpaTorsionClasses(sms) {
    var A = pathAlgebra(sms);
    var numVertices = sms.e;
    var arrows = A[0];
    var ideal = A[1];
    // QPA code to get torsion clasees from GAP
    var mystr = qpa(numVertices, arrows, ideal);
    // Execute Gap program to get torsion classes
    var exec = require("child_process").exec;
    var res = "";
    var resArr = [];
    return new Promise(function (resolve) {
        //let qpaCode = "cd /mnt/c/Users/ander/OneDrive/Dokumenter/Code/GAP-QPA/scripts && gap --nointeract -b -c '" + mystr +"'";
        var qpaCode = "cd /Users/ank/master/drive/code/qpa_scripts && gap --nointeract -b -c '\n" + mystr + "'";
        if (exports.verbose) {
            console.log("* Calling QPA code:");
            console.log(qpaCode);
        }
        exec(qpaCode, function (error, stdout, stderr) {
            if (error) {
                console.log("error: ".concat(error.message));
                return;
            }
            if (stderr) {
                console.log("stderr: ".concat(stderr));
                return;
            }
            res = stdout;
            res = res.replace(/\\/gi, '').replace(/\n/gi, '');
            resArr = JSON.parse(res);
            //resolve(resArr.filter(d=>d.length > 0));
            resolve(resArr);
        });
    })
        // Converts to CwObjectCollections
        .then(function (el) {
        // Torsion pairs
        var tp = el[0];
        // order + Convert to 0 index
        var order = el[1].map(function (a) { return [a[0] - 1, a[1] - 1]; });
        // Convert torsion classes to CWObjectCollection (i.e. to objects)
        var torsionFreeClassCollectionArray = [];
        for (var _a = 0, _b = tp; _a < _b.length; _a++) {
            var torsionFreeClass = _b[_a];
            var torsionFreeClassCollection = new CwObjectCollection([], sms.w, sms.e);
            for (var _c = 0, _d = torsionFreeClass; _c < _d.length; _c++) {
                var objectVec = _d[_c];
                torsionFreeClassCollection.add(dimensionVectorToObject(sms, objectVec));
            }
            torsionFreeClassCollectionArray.push(torsionFreeClassCollection);
        }
        return new Promise(function (resolve) { resolve([torsionFreeClassCollectionArray, order]); });
    });
}
exports.qpaTorsionClasses = qpaTorsionClasses;
function randomSimpleMindedSystem(w, e) {
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
    for (var i = 0; i < 10; i++) {
        var sms = new CwObjectCollection(helper(0, N - 1, true), w, e);
        //console.log("sms", sms)
        if (sms.isSimpleMindedSystem()) {
            return sms;
        }
    }
    return null;
}
exports.randomSimpleMindedSystem = randomSimpleMindedSystem;
function isEn(sms, n) {
    var a = new CwObjectCollection(sms.objectList, sms.w, sms.e);
    for (var i = 0; i < n; i++) {
        a = a.Sigma();
        if (isHomBetweenCollections(a, sms)) {
            return false;
        }
    }
    return true;
}
exports.isEn = isEn;
function ext2Agree(sms) {
    var sd = sms.Sigma();
    var dAsd = extension(sd, sms);
    var sdAd = extension(sms, sd);
    return collectionEqual(dAsd, sdAd);
}
exports.ext2Agree = ext2Agree;
//let d = new CwObjectCollection([[6,8],[3,11],[1,12],[4,9]],2,4);
//console.log(d.isSimpleMindedSystem());
//console.log(homDim([4,9],[7,9],2,4));
//let d = new CwObjectCollection([[3,5],[1,6],[7,9]],2,3);
//Assumes An
//qpaTorsionClasses(d)
//    .then(s=>{
//        for(let f of s as any[]){
//            console.log(f.isExtensionClosed() ,f)
//        }
//    });
