import * as nch from "../src/NegClustHelperFcts"
nch.setVerbose(true);


function display(w,e, sets){
    let str = "./gen.py " + w + " " + e + " mine.tex" 
    for(let i = 0; i < sets.length; i++) {
        str += " " + "\"" + JSON.stringify(sets[i].objectList) + "\"" 
    }
    return str
}

let A = new nch.CwObjectCollection([[21,27],[0,34],[0,20],[14,20],[7,20],[1,7],[7,27],[14,34],[0,27],[7,13],[21,34],[0,13],[28,34],[7,34],[14,27]], 6,5);
let [A_arrows, A_ideal, SA] = nch.pathAlgebraFromPasc(A)

SA = SA as nch.CwObjectCollection

let A_from_sms = SA.extensionClose()
if(!(nch.collectionEqual(A,A_from_sms) && A.isExtensionClosed() && nch.isEn(A, 5))){
    console.log("Doesn't check out A")
}else{
    console.log("* A checks out")
}

let B = new nch.CwObjectCollection([[23,29],[15,21],[22,35],[15,35],[29,35],[7,13],[1,35],[1,14],[1,7],[1,21]], 6,5);
let [B_arrows, B_ideal, SB] = nch.pathAlgebraFromPasc(B)
SB = SB as nch.CwObjectCollection

let B_from_sms = SB.extensionClose()
if(!(nch.collectionEqual(B,B_from_sms) && B.isExtensionClosed() && nch.isEn(B, 5))){
    console.log("Doesn't check out B")
}else{
    console.log("* B checks out")
}
let BSi = B.Sigma(-1)
let BSii = B.Sigma(-2)

let f_0 = nch.intersection(A,B)!
let f_1 = nch.intersection(A,BSi)!
let f_2 = nch.intersection(A,BSii)!

let e_0 = nch.filtGen(f_0, A)
let e_1 = f_1
let e_2 = nch.filtSub(f_2, A)

console.log("--------- A SMS ---------")
console.log(SA)
console.log("--------- Pathalgebra A ---------")
console.log("arrows:", A_arrows)
console.log("ideal:", A_ideal)
console.log("\n--------- B SMS ---------")
console.log(SB)
console.log("\n--------- E_0 ---------")
console.log(e_0)
console.log("\n--------- E_1 ---------")
console.log(e_1)
console.log("\n--------- E_2 ---------")
console.log(e_2)
console.log("\n--------- Display ---------")
console.log(display(6,5,[A,B,e_0,e_1,e_2]))
