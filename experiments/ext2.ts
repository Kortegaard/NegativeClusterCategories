import * as nch from "../src/NegClustHelperFcts"

const works:any[] = [];

for(let i = 0; i < 1000; i++){
    let w = 3;
    let e = 4;

    let num_arrows_wanted = e-2;

    let sms = nch.randomSimpleMindedSystem(w, e);
    if(!sms){continue}
    const kQ = nch.pathAlgebra(sms);
    let A = sms.extensionClose();

    if(kQ![0].length >= num_arrows_wanted && nch.isEn(A, 2) && nch.ext2Agree(A)){
        console.log("ALLOK", kQ, sms, A);
        console.log("\n\n\n\n");
        if(!works.some(mm => nch.collectionEqual(mm, sms!))){
            works.push(sms)
        }
    } 
    //if(kQ![0].length >= num_arrows_wanted && nch.isEn(A, 2)){
    //    console.log("is E2 " )//nch.collectionEqual(nch.extension(A, A.Sigma().Sigma()).extensionClose(), nch.extension(A.Sigma().Sigma(), A)), kQ);
    //}
    //if(kQ![0].length >= num_arrows_wanted && nch.ext2Agree(A)){
    //    console.log("Ext agree ", kQ);
    //}
}
 
console.log("\n\n\n\nALL THESE WORK")
for(let v of works){
    console.log(v);
}