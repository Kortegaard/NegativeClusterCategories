"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nch = require("../src/NegClustHelperFcts");
var works = [];
var _loop_1 = function (i) {
    var w = 3;
    var e = 4;
    var num_arrows_wanted = e - 2;
    var sms = nch.randomSimpleMindedSystem(w, e);
    if (!sms) {
        return "continue";
    }
    var kQ = nch.pathAlgebra(sms);
    var A = sms.extensionClose();
    if (kQ[0].length >= num_arrows_wanted && nch.isEn(A, 2) && nch.ext2Agree(A)) {
        console.log("ALLOK", kQ, sms, A);
        console.log("\n\n\n\n");
        if (!works.some(function (mm) { return nch.collectionEqual(mm, sms); })) {
            works.push(sms);
        }
    }
};
for (var i = 0; i < 1000; i++) {
    _loop_1(i);
}
console.log("\n\n\n\nALL THESE WORK");
for (var _i = 0, works_1 = works; _i < works_1.length; _i++) {
    var v = works_1[_i];
    console.log(v);
}
