"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nch = require("../src/NegClustHelperFcts");
nch.setVerbose(true);
var maxAmount = [];
var d = new nch.CwObjectCollection([[0, 3], [4, 11], [5, 8], [12, 15]], 3, 4);
var alg = d.extensionClose();
var p = nch.pathAlgebra(d);
console.log("--- BASIC PROPERTIES ---");
console.log("Is E_2:\t\t", nch.isEn(d, 2));
console.log("* property:\t", nch.ext2Agree(alg));
console.log("");
console.log("--- Algebras ---");
console.log("SMS:\t", p);
console.log("Path Algebra:\t", alg);
console.log("------------");
var AR = [[0, 3], [0, 11], [0, 15], [4, 11], [4, 15], [8, 11], [8, 15], [5, 8], [12, 15]];
function findIndex(obj) {
    for (var _i = 0; _i < AR.length; _i++) {
        if (AR[_i][0] == obj[0] && AR[_i][1] == obj[1]) {
            return _i;
        }
    }
    return -1;
}
nch.qpaTorsionClasses(d)
    .then(function (s) {
    var torsionFreeClasses = s[0];
    var order = s[1];
    console.log("--- TF CLASSES ---");
    for (var _a = 0, _b = torsionFreeClasses; _a < _b.length; _a++) {
        var f = _b[_a];
        var ol = f.objectList.map(function (a) { return findIndex(a); });
        var str = "\\dFourTors";
        for (var _i = 0; _i < 9; _i++) {
            if (ol.indexOf(_i) >= 0) {
                str = str + "{blue}";
            }
            else {
                str = str + "{}";
            }
        }
        console.log(str);
    }
});
