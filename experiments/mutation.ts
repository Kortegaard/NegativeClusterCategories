
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
            for(let f of s as any[]){
                //console.log(f)
                const c = d.mutate(f);
                const cAlg = c.extensionClose();

                //if( nch.ext2Agree(cAlg)){continue}
                if(!c.isSimpleMindedSystem()){continue}
                
                const b_ssd = d.Sigma().Sigma();
                const b_dAssd = nch.extension(b_ssd,alg);
                const b_ssdAd = nch.extension(alg,b_ssd);

                console.log(c.isSimpleMindedSystem(),  nch.ext2Agree(cAlg), nch.isEn(c,2))
                console.log("∑∑A*A" , b_dAssd);
                console.log("A*∑∑A",  b_ssdAd);

                console.log("sms:", d)
                console.log("torsion-free class:", f)
                console.log("A = <sms>:", alg);
                console.log("\n")
                console.log("mutated sms:", c);
                console.log("mutated Alg:", cAlg);

                const ssd = cAlg.Sigma().Sigma();
                const dAssd = nch.extension(ssd,cAlg);
                const ssdAd = nch.extension(cAlg,ssd);

                console.log("∑∑A*A" , dAssd);
                console.log("A*∑∑A", ssdAd);
                console.log("A*∑∑A in ∑∑A*A",dAssd?.containsSet(ssdAd?.objectList))
                console.log("\n\n\n\n\n\n");
                console.log("\n\n\n\n\n\n");
                //if(!nch.ext2Agree(cAlg)){break;}
            }
        });
    break;
}