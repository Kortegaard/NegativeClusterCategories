import * as nch from "../src/NegClustHelperFcts"
nch.setVerbose(true);

let w = 3
let e = 4
let sms = new nch.CwObjectCollection([ [ 0, 3 ], [ 4, 11 ], [ 5, 8 ], [ 12, 15 ]], w,e);
let alg = sms.extensionClose()

console.log(alg.findRandomTorsionFreeClass(3))
