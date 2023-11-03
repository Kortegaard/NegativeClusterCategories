"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.__esModule = true;
var nch = require("../src/NegClustHelperFcts");
nch.setVerbose(true);
//let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 4, 11 ], [ 5, 8 ], [ 12, 15 ]], 3,4);
var w = 5;
var e = 6;
test(w, e, 1);
function test(w, e, number) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _k;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (_k) {
                        var d, alg, p, foundone, i, en, alg1, sAlg, s2, pa_alg;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log("This is loop number:", _k);
                                    d = nch.randomSimpleMindedSystem(w, e);
                                    alg = d.extensionClose();
                                    p = nch.pathAlgebraFromPasc(alg);
                                    foundone = false;
                                    for (i = 0; i < 1000000; i++) {
                                        d = nch.randomSimpleMindedSystem(w, e);
                                        alg = d.extensionClose();
                                        p = nch.pathAlgebraFromPasc(alg);
                                        if (p[0].length >= e - 1) {
                                            foundone = true;
                                            break;
                                        }
                                    }
                                    d = new nch.CwObjectCollection([[0, 17], [1, 6], [7, 12], [18, 23], [24, 35], [25, 30]], w, e);
                                    alg = d.extensionClose();
                                    p = nch.pathAlgebraFromPasc(alg);
                                    console.log("FOUND? ", foundone);
                                    en = 4;
                                    alg1 = alg;
                                    sAlg = alg.Sigma();
                                    s2 = nch.extension(sAlg, alg);
                                    pa_alg = nch.pathAlgebraFromPasc(alg);
                                    if (!nch.isEn(alg, en)) {
                                        console.log("It is not E" + en);
                                        process.exit(0);
                                    }
                                    else {
                                        console.log("it is en");
                                    }
                                    console.log("--- BASIC PROPERTIES ---");
                                    console.log("");
                                    console.log("--- sms ---");
                                    console.log("SMS:\t", d);
                                    console.log("--- Algebras - sms ---");
                                    console.log("SMS Alg:\t", p);
                                    console.log("--- Algebras - pasc ---");
                                    console.log("pasc:\t", pa_alg);
                                    //console.log("Path Algebra:\t",alg)
                                    console.log("------------");
                                    //try {
                                    return [4 /*yield*/, nch.qpaTorsionClasses(d)
                                            .then(function (s) { return __awaiter(_this, void 0, void 0, function () {
                                            var n, _loop_2, _i, _a, f;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        n = -1;
                                                        _loop_2 = function (f) {
                                                            var c, c_alg, c_alg_sms, error_1;
                                                            return __generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        n++;
                                                                        c = alg.tilt(f);
                                                                        c_alg = nch.pathAlgebraFromPasc(c);
                                                                        c_alg_sms = c_alg[2];
                                                                        if (c_alg[0].length < e - 1) {
                                                                            return [2 /*return*/, "continue"];
                                                                        }
                                                                        _c.label = 1;
                                                                    case 1:
                                                                        _c.trys.push([1, 3, , 4]);
                                                                        return [4 /*yield*/, nch.qpaTorsionClasses(c_alg_sms)
                                                                                .then(function (tfs) {
                                                                                var m = -1;
                                                                                for (var _i = 0, _a = tfs[0]; _i < _a.length; _i++) {
                                                                                    var tf = _a[_i];
                                                                                    m++;
                                                                                    //if(m != 30){continue}
                                                                                    //console.log()
                                                                                    //console.log(m)
                                                                                    var alg3 = c.tilt(tf);
                                                                                    var alg3Quiv = nch.pathAlgebraFromPasc(alg3);
                                                                                    if (alg3Quiv[0].length < e - 1) {
                                                                                        //console.log("not here")
                                                                                        continue;
                                                                                    }
                                                                                    // Test what I need
                                                                                    // Calculate algebras and there shifts
                                                                                    if (!nch.isEn(alg, en)) {
                                                                                        continue;
                                                                                    }
                                                                                    var sAlg1 = alg1.Sigma();
                                                                                    var ssAlg1 = sAlg1.Sigma();
                                                                                    if (!nch.isEn(alg3, en)) {
                                                                                        continue;
                                                                                    }
                                                                                    var siAlg3 = alg3.Sigma(-1);
                                                                                    var sisiAlg3 = siAlg3.Sigma(-1);
                                                                                    var a1Ext1 = nch.extension(sAlg1, alg1); // ΣA * A
                                                                                    if (!a1Ext1) {
                                                                                        continue;
                                                                                    }
                                                                                    var a1Ext3 = nch.extension(ssAlg1, a1Ext1); // Σ^2A * (ΣA * A)
                                                                                    if (!a1Ext3) {
                                                                                        continue;
                                                                                    }
                                                                                    var a3Ext1 = nch.extension(alg3, siAlg3); // B * Σ^(-1)B
                                                                                    if (!a3Ext1) {
                                                                                        continue;
                                                                                    }
                                                                                    var a3Ext3 = nch.extension(a3Ext1, sisiAlg3); // B * Σ^(-1)B * Σ^(-2)B
                                                                                    if (!a3Ext3) {
                                                                                        continue;
                                                                                    }
                                                                                    // Is not boring
                                                                                    if (a1Ext3.containsSet(alg3.objectList) && // B ⊆ Σ^2A * (ΣA * A)
                                                                                        a3Ext3.containsSet(alg1.objectList) && // A ⊆ B * Σ^(-1)B * Σ^(-2)B
                                                                                        !a1Ext1.containsSet(alg3.objectList) && // B !⊆ ΣA * A      -- To ensure they are not "boring"
                                                                                        !a3Ext1.containsSet(alg1.objectList) // A ⊆ B * Σ^(-1)B
                                                                                    ) {
                                                                                        var f_1 = nch.intersection(alg1, alg3);
                                                                                        var f_2 = nch.intersection(alg1, siAlg3);
                                                                                        var f_3 = nch.intersection(alg1, sisiAlg3);
                                                                                        var e_1 = nch.filtGen(f_1, alg);
                                                                                        var e_2 = f_2;
                                                                                        var e_3 = nch.filtSub(f_3, alg);
                                                                                        var T1 = nch.extension(e_1, e_2);
                                                                                        var F1 = nch.extension(e_2, e_3);
                                                                                        var Lst = nch.extension(e_1, e_3);
                                                                                        if (e_1.objectList.length == 0 || e_2.objectList.length == 0 || e_3.objectList.length == 0) {
                                                                                            //console.log("*There is at least one e empty")
                                                                                            continue;
                                                                                        }
                                                                                        var trivial_objects_collection2 = nch.union(nch.union(nch.union(nch.union(T1, F1), e_1), e_3), Lst);
                                                                                        var trivial_objects_collection = nch.union(nch.union(nch.union(T1, F1), e_1), e_3);
                                                                                        var exist_non_trivial_objects = (trivial_objects_collection === null || trivial_objects_collection === void 0 ? void 0 : trivial_objects_collection.objectList.length) != alg.objectList.length;
                                                                                        var exist_non_trivial_objects2 = (trivial_objects_collection2 === null || trivial_objects_collection2 === void 0 ? void 0 : trivial_objects_collection2.objectList.length) != alg.objectList.length;
                                                                                        if (!exist_non_trivial_objects) {
                                                                                            //console.log("* No nontrivial objects")
                                                                                            continue;
                                                                                        }
                                                                                        if (!exist_non_trivial_objects2) {
                                                                                            console.log("Trivial ish");
                                                                                        }
                                                                                        var e_union = nch.union(nch.union(e_1, e_2), e_3);
                                                                                        var is_all = nch.collectionEqual(e_union, alg);
                                                                                        if (!is_all) {
                                                                                            console.log(alg3Quiv[0], alg3Quiv[1]);
                                                                                            console.log("./gen.py " + d.w + " " + d.e + " mine.tex "
                                                                                                + "\"" + JSON.stringify(alg1.objectList) + "\""
                                                                                                + " " + "\"" + JSON.stringify(alg3.objectList) + "\""
                                                                                                + " " + "\"" + JSON.stringify(e_1.objectList) + "\""
                                                                                                + " " + "\"" + JSON.stringify(e_2.objectList) + "\""
                                                                                                + " " + "\"" + JSON.stringify(e_3.objectList) + "\"");
                                                                                            console.log();
                                                                                            console.log();
                                                                                            console.log();
                                                                                        }
                                                                                    }
                                                                                }
                                                                            })];
                                                                    case 2:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 4];
                                                                    case 3:
                                                                        error_1 = _c.sent();
                                                                        console.log("*Something went wrong 2");
                                                                        console.log(error_1);
                                                                        return [3 /*break*/, 4];
                                                                    case 4: return [2 /*return*/];
                                                                }
                                                            });
                                                        };
                                                        _i = 0, _a = s[0];
                                                        _b.label = 1;
                                                    case 1:
                                                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                                                        f = _a[_i];
                                                        return [5 /*yield**/, _loop_2(f)];
                                                    case 2:
                                                        _b.sent();
                                                        _b.label = 3;
                                                    case 3:
                                                        _i++;
                                                        return [3 /*break*/, 1];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 1:
                                    //try {
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _k = 0;
                    _a.label = 1;
                case 1:
                    if (!(_k < number)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(_k)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _k++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
