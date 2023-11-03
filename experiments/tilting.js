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
        for (var _i = 0, _a = s[0]; _i < _a.length; _i++) {
            var f = _a[_i];
            //console.log(f.objectList)
            var c = alg.tilt(f);
            console.log(c.isExtensionClosed());
            //const cAlg = c.extensionClose();
        }
    });
    return "break";
};
for (var i = 0; i < 1000; i++) {
    var state_1 = _loop_1(i);
    if (state_1 === "break")
        break;
}
