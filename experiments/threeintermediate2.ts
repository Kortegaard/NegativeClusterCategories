import * as nch from "../src/NegClustHelperFcts"
nch.setVerbose(true);

let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 4, 11 ], [ 5, 8 ], [ 12, 15 ]], 3,4);

let w = 5
let e = 5

function display(w,e, sets){
    let str = "./gen.py " + w + " " + e + " mine.tex" 
    for(let i = 0; i < sets.length; i++) {
        str += " " + "\"" + JSON.stringify(sets[i].objectList) + "\"" 
    }
    console.log(str)
}

test(w, e, 10000)

function test(w, e, num){
    for (let _ = 0; _ < num; _++) {
        RunSingleRandomRound(w, e, false)
    }
}

function RunSingleRandomRound(w, e, verbose = false){
    //
    let sms1 = nch.randomSimpleMindedSystem(w, e);
    //
    let alg1 = sms1?.extensionClose()

    let p = nch.pathAlgebraFromPasc(alg1) as any[];
    for(let i = 0; i < 1000000; i++){
        sms1 = nch.randomSimpleMindedSystem(w,e);
        alg1 = sms1?.extensionClose();
        p = nch.pathAlgebraFromPasc(alg1) as any[];
        if(p[0].length>=e-1){
            //console.log("found one:", i)
            break
        }
    }
    if(!nch.isEn(alg1, 4)){ return; }

    let torsFree1 = alg1?.findRandomTorsionFreeClass(5);


    let alg2 = alg1?.tilt(torsFree1!);
    let torsFree2 = alg2?.findRandomTorsionFreeClass(5);

    let alg3 = alg2?.tilt(torsFree2!);
    if(!nch.isEn(alg3, 4)){ return; }
    p = nch.pathAlgebraFromPasc(alg3) as any[];
    if(p[0].length<e-1){ return }

    // --------

    let SigmaAlg1  = alg1?.Sigma(1)
    let Sigma2Alg1 = alg1?.Sigma(2)

    let ext_Salg1_alg1 = nch.extension(SigmaAlg1!, alg1!) // ΣA * A
    let ext_SSalg1_alg1 = nch.extension(Sigma2Alg1!, alg1!) // Σ^2A * A
    let ext_SSalg1_Salg1_alg1 = nch.extension(Sigma2Alg1!, ext_Salg1_alg1!) // Σ^2A * ΣA * A


    let SigmaInvAlg3  = alg3?.Sigma(-1)
    let Sigma2InvAlg3 = alg3?.Sigma(-2)

    let ext_alg3_SiAlg3 = nch.extension(alg3!, SigmaInvAlg3!) // B * Σ^(-1)B
    let ext_alg3_SisiAlg3 = nch.extension(alg3!, Sigma2InvAlg3!) // B * Σ^(-2)B
    let ext_alg3_SiAlg3_SiSiAlg3 = nch.extension(ext_alg3_SiAlg3!, Sigma2InvAlg3!) // B * Σ^(-1)B * Σ^(-2)B


    let is_2_times_tilting = 
        ext_SSalg1_Salg1_alg1?.containsSet(alg3?.objectList!)
        && ext_alg3_SiAlg3_SiSiAlg3?.containsSet(alg1?.objectList!);

    if(!is_2_times_tilting){ 
        if(verbose){
            console.log("* Not a 2 times tilt")
        }
        return 
    }

    let is_single_tilt = 
        ext_alg3_SiAlg3?.containsSet(alg1?.objectList!) // A \setubeq  B * Σ^(-1)B

    if(is_single_tilt){ 
        if(verbose){
            console.log("* Single tilt")
        }
        return 
    }


    let f_1 = nch.intersection(alg1!,alg3!)!
    let f_2 = nch.intersection(alg1!,SigmaInvAlg3!)!
    let f_3 = nch.intersection(alg1!,Sigma2InvAlg3!)!

    let e_1 = nch.filtGen(f_1, alg1!)
    let e_2 = f_2
    let e_3 = nch.filtSub(f_3, alg1!)

    let T1 = nch.extension(e_1,e_2)
    let F1 = nch.extension(e_2,e_3)
    let Lst = nch.extension(e_1,e_3)

    // Need non-empty E's
    if(e_1.objectList.length == 0 || e_2.objectList.length == 0 || e_3.objectList.length == 0){
        if(verbose){
            console.log("* Empty E's")
        }
        return
    }
    const trivial_objects_collection2 = nch.union(nch.union(nch.union(nch.union(T1,F1), e_1),e_3), Lst)
    const trivial_objects_collection = nch.union(nch.union(nch.union(T1,F1), e_1),e_3)
    let exist_non_trivial_objects =  trivial_objects_collection?.objectList.length != alg1.objectList.length
    let exist_non_trivial_objects2 =  trivial_objects_collection2?.objectList.length != alg1.objectList.length
    if(!exist_non_trivial_objects){
        if(verbose){
            console.log("*Trivial")
        }
        return
    }
    if(!exist_non_trivial_objects2){
        if(verbose){
            console.log("*Trivial ish")
        }
        return
    }
    console.log("E=F:", nch.collectionEqual(f_1, e_1) &&  nch.collectionEqual(f_3, e_3))
    display(w,e,[alg1, alg3,e_1,e_2,e_3])
    console.log("FOUND ONE")
}