
import * as nch from "../src/NegClustHelperFcts"

const maxAmount = [];
let amount = 0;
let j = 0;
let w = 5
let e = 4
for(let i = 0; i < 1000000; i++){
    let d1 = nch.randomSimpleMindedSystem(w,e);
    let d2 = nch.randomSimpleMindedSystem(w,e);
    
    if(!d1){continue}
    if(!d2){continue}
    // Some cases we dont want
    if(d1.isExtensionClosed() || d2.isExtensionClosed()){
        continue
    }
    if(nch.collectionEqual(d1,d2)){
        continue
    }
    //console.log("Both are SMS: ", d1.isSimpleMindedSystem() && d2.isSimpleMindedSystem())
    let en = 5 

    // Calculate algebras and there shifts
    let alg1 = d1.extensionClose();
    if(!nch.isEn(alg1, en)){ continue }
    let sAlg1 = alg1.Sigma();
    let ssAlg1 = sAlg1.Sigma();

    let alg2 = d2.extensionClose();
    if(!nch.isEn(alg2, en)){ continue }
    let siAlg2 = alg2.Sigma(-1);
    let sisiAlg2 = siAlg2.Sigma(-1);


    let a1Ext1 = nch.extension(sAlg1, alg1) // ΣA * A
    if(!a1Ext1){continue} 
    let a1Ext2 = nch.extension(ssAlg1, a1Ext1); // Σ^2A * (ΣA * A)
    if(!a1Ext2){continue}

    let a2Ext1 = nch.extension(alg2, siAlg2) // B * Σ^(-1)B
    if(!a2Ext1){continue}
    let a2Ext2 = nch.extension(a2Ext1, sisiAlg2); // B * Σ^(-1)B * Σ^(-2)B
    if(!a2Ext2){continue}

    if(i % 10000 == 0){
        console.log(i,j)
    }
    //console.log("contain: ", a1Ext2.containsSet(alg2.objectList));
    if(
        a1Ext2.containsSet(alg2.objectList)  && // B ⊆ Σ^2A * (ΣA * A)
        a2Ext2.containsSet(alg1.objectList)  && // A ⊆ B * Σ^(-1)B * Σ^(-2)B
        !a1Ext1.containsSet(alg2.objectList) && // B !⊆ ΣA * A      -- To ensure they are not "boring"
        !a2Ext1.containsSet(alg1.objectList)    // A ⊆ B * Σ^(-1)B
    ){
        amount += 1;
        console.log("./gen.py " + w + " " + e + " mine.tex " +  "\""+JSON.stringify(alg1.objectList)+ "\"" + " " + "\"" + JSON.stringify(alg2.objectList) + "\"")
        //console.log(alg2.objectList.toString())
        break;
    }
    
    j++
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

console.log("amount:", amount)