"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nch = require("../src/NegClustHelperFcts");
var maxAmount = [];
var _loop_1 = function (i) {
    var d = nch.randomSimpleMindedSystem(3, 4);
    if (!d) {
        return "continue";
    }
    var alg = d.extensionClose();
    var p = nch.pathAlgebra(d);
    if (p[0].length > 1) {
        if (!maxAmount.some(function (mm) { return nch.collectionEqual(mm, d); })) {
            maxAmount.push(d);
        }
    }
    else {
        return "continue";
    }
    console.log(nch.isEn(d, 2));
    if (!nch.ext2Agree(alg)) {
        return "continue";
    }
    console.log("ARROWS ARE GOOD");
    console.log(d);
    nch.qpaTorsionClasses(d)
        .then(function (s) {
        var torsionFreeClasses = s[0];
        var order = s[1];
        console.log("--TF CLASSES--");
        console.log(torsionFreeClasses.map(function (a) { return a.toString(); }));
        for (var _i = 0, _a = torsionFreeClasses; _i < _a.length; _i++) {
            var f = _a[_i];
            var cAlg = d.mutate(f);
            var b_ssd = d.Sigma().Sigma();
            var b_dAssd = nch.extension(b_ssd, alg);
            var b_ssdAd = nch.extension(alg, b_ssd);
            var ssd = cAlg.Sigma().Sigma();
            var dAssd = nch.extension(ssd, cAlg);
            var ssdAd = nch.extension(cAlg, ssd);
        }
    });
    return "break";
};
for (var i = 0; i < 1000; i++) {
    var state_1 = _loop_1(i);
    if (state_1 === "break")
        break;
}
