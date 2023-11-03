import * as nch from "../src/NegClustHelperFcts"
nch.setVerbose(true);

//let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 4, 11 ], [ 5, 8 ], [ 12, 15 ]], 3,4);

let w = 5
let e = 6

test(w,e, 5)

async function test(w, e, number){
    for(let _k = 0; _k < number; _k++){
        console.log("This is loop number:", _k)
        //let d = new nch.CwObjectCollection([ [ 0, 11 ], [ 1, 6 ], [ 12, 17 ], [ 18, 23 ] ], 5,4);
        let d = nch.randomSimpleMindedSystem(w,e);
        let alg = d.extensionClose();
        let p = nch.pathAlgebraFromPasc(alg) as any[];
        let foundone = false
        for(let i = 0; i < 1000000; i++){
            d = nch.randomSimpleMindedSystem(w,e);
            alg = d.extensionClose();
            p = nch.pathAlgebraFromPasc(alg) as any[];
            if(p[0].length>=e-1){
                foundone = true
                break
            }
        }
        console.log("FOUND? ", foundone)
        let en = 4
        let alg1 = alg
        let sAlg = alg.Sigma()
        let s2 = nch.extension(sAlg,alg)
        const pa_alg = nch.pathAlgebraFromPasc(alg)
        if(!nch.isEn(alg, en)){
            console.log("It is not E"+en)
            process.exit(0);
        }else{
            console.log("it is en")
        }

        console.log("--- BASIC PROPERTIES ---")

        console.log("");
        console.log("--- sms ---")
        console.log("SMS:\t",d)
        console.log("--- Algebras - sms ---")
        console.log("SMS Alg:\t",p)
        console.log("--- Algebras - pasc ---")
        console.log("pasc:\t",pa_alg)
        //console.log("Path Algebra:\t",alg)
        console.log("------------");
        try {
            await nch.qpaTorsionClasses(d)
            .then(async s=>{
                //up to 35
                let n = -1
                for(let f of s[0] as any[]){
                    n++
                    const c = alg.tilt(f);
                    let c_alg = nch.pathAlgebraFromPasc(c) as any[];
                    let c_alg_sms = c_alg[2] as nch.CwObjectCollection
                    if(c_alg[0].length<e-1){
                        //console.log("not this one")
                        continue
                    }
                    try {
                        
                    await nch.qpaTorsionClasses(c_alg_sms)
                        .then(tfs=>{
                            let m = -1
                            for(let tf of tfs[0] as any[]){
                                m++
                                //if(m != 30){continue}
                                //console.log()
                                //console.log(m)
                                const alg3 = c.tilt(tf);
        
                                const alg3Quiv = nch.pathAlgebraFromPasc(alg3) as any[]
                                if(alg3Quiv[0].length < e-1){
                                    //console.log("not here")
                                    continue
                                }
        
                                // Test what I need
                                // Calculate algebras and there shifts
                                if(!nch.isEn(alg, en)){ continue }
                                let sAlg1 = alg1.Sigma();
                                let ssAlg1 = sAlg1.Sigma();
        
                                if(!nch.isEn(alg3, en)){ continue }
                                let siAlg3 = alg3.Sigma(-1);
                                let sisiAlg3 = siAlg3.Sigma(-1);
        
        
                                let a1Ext1 = nch.extension(sAlg1, alg1) // ΣA * A
                                if(!a1Ext1){continue} 
                                let a1Ext3 = nch.extension(ssAlg1, a1Ext1); // Σ^2A * (ΣA * A)
                                if(!a1Ext3){continue}
        
                                let a3Ext1 = nch.extension(alg3, siAlg3) // B * Σ^(-1)B
                                if(!a3Ext1){continue}
                                let a3Ext3 = nch.extension(a3Ext1, sisiAlg3); // B * Σ^(-1)B * Σ^(-2)B
                                if(!a3Ext3){continue}
        
                                // Is not boring
        
                                if(
                                    a1Ext3.containsSet(alg3.objectList)  && // B ⊆ Σ^2A * (ΣA * A)
                                    a3Ext3.containsSet(alg1.objectList)  && // A ⊆ B * Σ^(-1)B * Σ^(-2)B
                                    !a1Ext1.containsSet(alg3.objectList) && // B !⊆ ΣA * A      -- To ensure they are not "boring"
                                    !a3Ext1.containsSet(alg1.objectList)    // A ⊆ B * Σ^(-1)B
                                ){
                                    let f_1 = nch.intersection(alg1,alg3)
                                    let f_2 = nch.intersection(alg1,siAlg3)
                                    let f_3 = nch.intersection(alg1,sisiAlg3)
        
                                    let e_1 = nch.filtGen(f_1, alg)
                                    let e_2 = f_2
                                    let e_3 = nch.filtSub(f_3, alg)
        
                                    let T1 = nch.extension(e_1,e_2)
                                    let F1 = nch.extension(e_2,e_3)
                                    let Lst = nch.extension(e_1,e_3)
        
                                    if(e_1.objectList.length == 0 || e_2.objectList.length == 0 || e_3.objectList.length == 0){
                                        //console.log("*There is at least one e empty")
                                        continue
                                    }

                                    const trivial_objects_collection2 = nch.union(nch.union(nch.union(nch.union(T1,F1), e_1),e_3), Lst)
                                    const trivial_objects_collection = nch.union(nch.union(nch.union(T1,F1), e_1),e_3)
                                    let exist_non_trivial_objects =  trivial_objects_collection?.objectList.length != alg.objectList.length
                                    let exist_non_trivial_objects2 =  trivial_objects_collection2?.objectList.length != alg.objectList.length
                                    if(!exist_non_trivial_objects){
                                        //console.log("* No nontrivial objects")
                                        continue
                                    }
                                    if(!exist_non_trivial_objects2){
                                        console.log("Trivial ish")
                                    }
        
                                    let e_union = nch.union(nch.union(e_1, e_2),e_3)
                                    let is_all = nch.collectionEqual(e_union, alg)
                                    if(!is_all){
                                        console.log(alg3Quiv[0], alg3Quiv[1])
                                        console.log("./gen.py " + d.w + " " + d.e + " mine.tex " 
                                        + "\""+JSON.stringify(alg1.objectList)+ "\"" 
                                        + " " + "\"" + JSON.stringify(alg3.objectList) + "\"" 
                                        + " " + "\"" + JSON.stringify(e_1.objectList) + "\"" 
                                        + " " + "\"" + JSON.stringify(e_2.objectList) + "\"" 
                                        + " " + "\"" + JSON.stringify(e_3.objectList) + "\"") 
                                        console.log()
                                        console.log()
                                        console.log()
                                    }
                                    
                                }
                            }
                        });
                    } catch (error) {
                        console.log("*Something went wrong")
                        console.log(error)
                    }
                }
            });
        }catch(error){
            console.log("*Something went wrong")
            console.log(error)
        }
    }
}

