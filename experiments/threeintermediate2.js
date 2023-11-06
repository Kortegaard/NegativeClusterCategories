"use strict";
exports.__esModule = true;
var nch = require("../src/NegClustHelperFcts");
nch.setVerbose(true);
var d = new nch.CwObjectCollection([[0, 3], [4, 11], [5, 8], [12, 15]], 3, 4);
var w = 5;
var e = 5;
function display(w, e, sets) {
    var str = "./gen.py " + w + " " + e + " mine.tex";
    for (var i = 0; i < sets.length; i++) {
        str += " " + "\"" + JSON.stringify(sets[i].objectList) + "\"";
    }
    console.log(str);
}
test(w, e, 10000);
function test(w, e, num) {
    for (var _ = 0; _ < num; _++) {
        RunSingleRandomRound(w, e, false);
    }
}
function RunSingleRandomRound(w, e, verbose) {
    if (verbose === void 0) { verbose = false; }
    //
    var sms1 = nch.randomSimpleMindedSystem(w, e);
    //
    var alg1 = sms1 === null || sms1 === void 0 ? void 0 : sms1.extensionClose();
    var p = nch.pathAlgebraFromPasc(alg1);
    for (var i = 0; i < 1000000; i++) {
        sms1 = nch.randomSimpleMindedSystem(w, e);
        alg1 = sms1 === null || sms1 === void 0 ? void 0 : sms1.extensionClose();
        p = nch.pathAlgebraFromPasc(alg1);
        if (p[0].length >= e - 1) {
            //console.log("found one:", i)
            break;
        }
    }
    if (!nch.isEn(alg1, 4)) {
        return;
    }
    var torsFree1 = alg1 === null || alg1 === void 0 ? void 0 : alg1.findRandomTorsionFreeClass(5);
    var alg2 = alg1 === null || alg1 === void 0 ? void 0 : alg1.tilt(torsFree1);
    var torsFree2 = alg2 === null || alg2 === void 0 ? void 0 : alg2.findRandomTorsionFreeClass(5);
    var alg3 = alg2 === null || alg2 === void 0 ? void 0 : alg2.tilt(torsFree2);
    if (!nch.isEn(alg3, 4)) {
        return;
    }
    p = nch.pathAlgebraFromPasc(alg3);
    if (p[0].length < e - 1) {
        return;
    }
    // --------
    var SigmaAlg1 = alg1 === null || alg1 === void 0 ? void 0 : alg1.Sigma(1);
    var Sigma2Alg1 = alg1 === null || alg1 === void 0 ? void 0 : alg1.Sigma(2);
    var ext_Salg1_alg1 = nch.extension(SigmaAlg1, alg1); // ΣA * A
    var ext_SSalg1_alg1 = nch.extension(Sigma2Alg1, alg1); // Σ^2A * A
    var ext_SSalg1_Salg1_alg1 = nch.extension(Sigma2Alg1, ext_Salg1_alg1); // Σ^2A * ΣA * A
    var SigmaInvAlg3 = alg3 === null || alg3 === void 0 ? void 0 : alg3.Sigma(-1);
    var Sigma2InvAlg3 = alg3 === null || alg3 === void 0 ? void 0 : alg3.Sigma(-2);
    var ext_alg3_SiAlg3 = nch.extension(alg3, SigmaInvAlg3); // B * Σ^(-1)B
    var ext_alg3_SisiAlg3 = nch.extension(alg3, Sigma2InvAlg3); // B * Σ^(-2)B
    var ext_alg3_SiAlg3_SiSiAlg3 = nch.extension(ext_alg3_SiAlg3, Sigma2InvAlg3); // B * Σ^(-1)B * Σ^(-2)B
    var is_2_times_tilting = (ext_SSalg1_Salg1_alg1 === null || ext_SSalg1_Salg1_alg1 === void 0 ? void 0 : ext_SSalg1_Salg1_alg1.containsSet(alg3 === null || alg3 === void 0 ? void 0 : alg3.objectList))
        && (ext_alg3_SiAlg3_SiSiAlg3 === null || ext_alg3_SiAlg3_SiSiAlg3 === void 0 ? void 0 : ext_alg3_SiAlg3_SiSiAlg3.containsSet(alg1 === null || alg1 === void 0 ? void 0 : alg1.objectList));
    if (!is_2_times_tilting) {
        if (verbose) {
            console.log("* Not a 2 times tilt");
        }
        return;
    }
    var is_single_tilt = ext_alg3_SiAlg3 === null || ext_alg3_SiAlg3 === void 0 ? void 0 : ext_alg3_SiAlg3.containsSet(alg1 === null || alg1 === void 0 ? void 0 : alg1.objectList); // A \setubeq  B * Σ^(-1)B
    if (is_single_tilt) {
        if (verbose) {
            console.log("* Single tilt");
        }
        return;
    }
    var f_1 = nch.intersection(alg1, alg3);
    var f_2 = nch.intersection(alg1, SigmaInvAlg3);
    var f_3 = nch.intersection(alg1, Sigma2InvAlg3);
    var e_1 = nch.filtGen(f_1, alg1);
    var e_2 = f_2;
    var e_3 = nch.filtSub(f_3, alg1);
    var T1 = nch.extension(e_1, e_2);
    var F1 = nch.extension(e_2, e_3);
    var Lst = nch.extension(e_1, e_3);
    // Need non-empty E's
    if (e_1.objectList.length == 0 || e_2.objectList.length == 0 || e_3.objectList.length == 0) {
        if (verbose) {
            console.log("* Empty E's");
        }
        return;
    }
    var trivial_objects_collection2 = nch.union(nch.union(nch.union(nch.union(T1, F1), e_1), e_3), Lst);
    var trivial_objects_collection = nch.union(nch.union(nch.union(T1, F1), e_1), e_3);
    var exist_non_trivial_objects = (trivial_objects_collection === null || trivial_objects_collection === void 0 ? void 0 : trivial_objects_collection.objectList.length) != alg1.objectList.length;
    var exist_non_trivial_objects2 = (trivial_objects_collection2 === null || trivial_objects_collection2 === void 0 ? void 0 : trivial_objects_collection2.objectList.length) != alg1.objectList.length;
    if (!exist_non_trivial_objects) {
        if (verbose) {
            console.log("*Trivial");
        }
        return;
    }
    if (!exist_non_trivial_objects2) {
        if (verbose) {
            console.log("*Trivial ish");
        }
        return;
    }
    console.log("E=F:", nch.collectionEqual(f_1, e_1) && nch.collectionEqual(f_3, e_3));
    display(w, e, [alg1, alg3, e_1, e_2, e_3]);
    console.log("FOUND ONE");
}
