"use strict";
// This is finding examples of proper abelian subcategories
// that can be used to find torsion triples
//
//
exports.__esModule = true;
var ncc = require("../src/NCC");
// Tilt an proper abelian subcategory at a random torsion class
function randomTilt(alg) {
    var T = ncc.findRandomTorsionFreeClass(alg);
    return ncc.tilt(alg, T);
}
var A = null;
var B = null;
for (var i = 0; i < 10000; i++) {
    // Find random simple-minded system
    var sms = ncc.randomSimpleMindedSystem3(6, 6);
    var alg = ncc.extensionClose(sms);
    if (!ncc.isEn(alg, 5)) {
        continue;
    }
    // Tilt twice at random
    var alg2 = randomTilt(alg);
    var alg3 = randomTilt(alg2);
    // Check if the pair (alg, alg3) satisfies the wanted criteria
    if (!ncc.isEn(alg3, 5)) {
        continue;
    }
    // Check if the needed properties are satisfied
    var SSA_SA_A = ncc.extension(ncc.Sigma(alg, 2), ncc.extension(ncc.Sigma(alg), alg));
    var B_SB_SSB = ncc.extension(alg3, ncc.extension(ncc.Sigma(alg3, -1), ncc.Sigma(alg3, -2)));
    if (!SSA_SA_A.containsSet(alg3.diagonals)) {
        continue;
    }
    if (!B_SB_SSB.containsSet(alg.diagonals)) {
        continue;
    }
    // Ensure not boring
    var SA_A = ncc.extension(ncc.Sigma(alg), alg);
    if (SA_A.containsSet(alg3.diagonals)) {
        continue;
    }
    A = alg;
    B = alg3;
    break;
}
console.log(A);
console.log(B);
