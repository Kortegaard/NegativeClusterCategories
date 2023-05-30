import * as nch from "../src/NegClustHelperFcts"
//let d = new nch.CwObjectCollection([[ 0, 3 ], [ 10, 13 ], [ 14, 17 ]],3,4)
let d = new nch.CwObjectCollection([[ 0, 3 ], [5,8], [ 10, 13 ], [ 14, 17 ]],3,4)

let sms = d.Sigma().Sigma().Sigma().Sigma().Sigma().Sigma().Sigma().Sigma();
let A = sms.extensionClose();
let kQ = nch.pathAlgebra(sms);

console.log("SMS", sms)
console.log("sigma squared SMS", sms.Sigma().Sigma())
console.log("ALG", A)
console.log("kQ", kQ)

console.log(sms.isSimpleMindedSystem());
console.log(nch.isEn(sms, 2))
console.log(nch.ext2Agree(sms))



