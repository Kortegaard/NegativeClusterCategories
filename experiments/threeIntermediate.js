"use strict";
exports.__esModule = true;
var nch = require("../src/NegClustHelperFcts");
var maxAmount = [];
var amount = 0;
for (var i = 0; i < 1000000; i++) {
    var d1 = nch.randomSimpleMindedSystem(10, 4);
    var d2 = nch.randomSimpleMindedSystem(10, 4);
    if (!d1) {
        continue;
    }
    if (!d2) {
        continue;
    }
    //console.log("Both are SMS: ", d1.isSimpleMindedSystem() && d2.isSimpleMindedSystem())
    var alg1 = d1.extensionClose();
    var sAlg1 = alg1.Sigma();
    var ssAlg1 = sAlg1.Sigma();
    var alg2 = d2.extensionClose();
    var siAlg2 = alg2.Sigma(-1);
    var sisiAlg2 = siAlg2.Sigma(-1);
    var a1Ext1 = nch.extension(ssAlg1, sAlg1);
    if (!a1Ext1) {
        continue;
    }
    var a1Ext2 = nch.extension(a1Ext1, alg1);
    if (!a1Ext2) {
        continue;
    }
    var a2Ext1 = nch.extension(alg2, siAlg2);
    if (!a2Ext1) {
        continue;
    }
    var a2Ext2 = nch.extension(a2Ext1, sisiAlg2);
    if (!a2Ext2) {
        continue;
    }
    //console.log("contain: ", a1Ext2.containsSet(alg2.objectList));
    if (a1Ext2.containsSet(alg2.objectList) && nch.isEn(alg1, 9) &&
        a2Ext2.containsSet(alg1.objectList) && nch.isEn(alg2, 9)) {
        amount += 1;
        console.log(amount);
    }
    //const p = nch.pathAlgebra(d);
    //if(p[0].length > 2){
    //    if(!maxAmount.some(mm => nch.collectionEqual(mm, d))){
    //        maxAmount.push(d)
    //    }
    //}else{continue;}
    //console.log(nch.isEn(d,2));
    //if(!nch.ext2Agree(alg)){continue}
    //console.log("ARROWS ARE GOOD");
}
console.log("amount:", amount);
