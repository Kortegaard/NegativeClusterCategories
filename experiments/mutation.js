"use strict";
exports.__esModule = true;
var nch = require("../src/NegClustHelperFcts");
var maxAmount = [];
var _loop_1 = function (i) {
    var d = nch.randomSimpleMindedSystem(4, 4);
    //let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 5, 8 ], [ 9, 12 ], [ 14, 17 ], [ 18, 21 ] ], 3,5);
    //let d = new nch.CwObjectCollection([ [1,20], [5,16], [9,12],[6,13],[2,17]], 3,5);
    if (!d) {
        return "continue";
    }
    var alg = d.extensionClose();
    var p = nch.pathAlgebra(d);
    if (p[0].length > 2) {
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
    nch.qpaTorsionClasses(d)
        .then(function (s) {
        for (var _i = 0, _a = s; _i < _a.length; _i++) {
            var f = _a[_i];
            //console.log(f)
            var c = d.mutate(f);
            var cAlg = c.extensionClose();
            //if( nch.ext2Agree(cAlg)){continue}
            if (!c.isSimpleMindedSystem()) {
                continue;
            }
            var b_ssd = d.Sigma().Sigma();
            var b_dAssd = nch.extension(b_ssd, alg);
            var b_ssdAd = nch.extension(alg, b_ssd);
            console.log(c.isSimpleMindedSystem(), nch.ext2Agree(cAlg), nch.isEn(c, 2));
            console.log("∑∑A*A", b_dAssd);
            console.log("A*∑∑A", b_ssdAd);
            console.log("sms:", d);
            console.log("torsion-free class:", f);
            console.log("A = <sms>:", alg);
            console.log("\n");
            console.log("mutated sms:", c);
            console.log("mutated Alg:", cAlg);
            var ssd = cAlg.Sigma().Sigma();
            var dAssd = nch.extension(ssd, cAlg);
            var ssdAd = nch.extension(cAlg, ssd);
            console.log("∑∑A*A", dAssd);
            console.log("A*∑∑A", ssdAd);
            console.log("A*∑∑A in ∑∑A*A", dAssd === null || dAssd === void 0 ? void 0 : dAssd.containsSet(ssdAd === null || ssdAd === void 0 ? void 0 : ssdAd.objectList));
            console.log("\n\n\n\n\n\n");
            console.log("\n\n\n\n\n\n");
            //if(!nch.ext2Agree(cAlg)){break;}
        }
    });
    return "break";
};
for (var i = 0; i < 1000; i++) {
    var state_1 = _loop_1(i);
    if (state_1 === "break")
        break;
}
