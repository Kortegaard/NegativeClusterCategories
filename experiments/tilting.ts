
import * as nch from "../src/NegClustHelperFcts"

const maxAmount = [];
for(let i = 0; i < 1000; i++){
    let d = nch.randomSimpleMindedSystem(4,4);
    //let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 5, 8 ], [ 9, 12 ], [ 14, 17 ], [ 18, 21 ] ], 3,5);
    //let d = new nch.CwObjectCollection([ [1,20], [5,16], [9,12],[6,13],[2,17]], 3,5);
    if(!d){continue}
    let alg = d.extensionClose();
    
    const p = nch.pathAlgebra(d);

    if(p[0].length > 2){
        if(!maxAmount.some(mm => nch.collectionEqual(mm, d))){
            maxAmount.push(d)
        }
    }else{continue;}
    console.log(nch.isEn(d,2));

    if(!nch.ext2Agree(alg)){continue}
    console.log("ARROWS ARE GOOD");


    nch.qpaTorsionClasses(d)
        .then(s=>{
            for(let f of s[0] as any[]){
                //console.log(f.objectList)
                const c = alg.tilt(f);
                console.log(c.isExtensionClosed())
                
                //const cAlg = c.extensionClose();
            }
        });
    break;
}