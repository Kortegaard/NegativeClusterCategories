/** 
 * 
 * Description:
 *
 * There is a simple minded system d. The following is done for this sms
 * 
 * - Calculate path algebra (is of type D4)
 * - Checks that is path algebra is E2, and has the start property
 * - Calculates all the torsion-free classes, and prints them to special latex command (for visualization)
 * 
*/

import * as nch from "../src/NegClustHelperFcts"
nch.setVerbose(true);

const maxAmount = [];
let d = new nch.CwObjectCollection([ [ 0, 3 ], [ 4, 11 ], [ 5, 8 ], [ 12, 15 ]], 3,4);

let alg = d.extensionClose();
const p = nch.pathAlgebra(d);

console.log("--- BASIC PROPERTIES ---")

console.log("Is E_2:\t\t", nch.isEn(d,2));
console.log("* property:\t", nch.ext2Agree(alg));
console.log("");
console.log("--- Algebras ---")
console.log("SMS:\t",p)
console.log("Path Algebra:\t",alg)
console.log("------------");

let AR = [[0,3], [0,11], [0,15], [4,11], [4,15], [8,11], [8,15], [5,8], [12,15]]

function findIndex(obj: [number, number]){
    for(var _i = 0; _i < AR.length; _i++){
        if(AR[_i][0] == obj[0] && AR[_i][1] == obj[1]){
            return _i;
        }
    }
    return -1;
}

nch.qpaTorsionClasses(d)
    .then(s=>{
        let torsionFreeClasses = (s as any[])[0] as nch.CwObjectCollection[];
        let order              = (s as any[])[1] as [number, number][]; 

        console.log("--- TF CLASSES ---")
        //console.log(torsionFreeClasses.map(a => a.toString()))
        for(let f of torsionFreeClasses as any[]){
            let ol = f.objectList.map(a => findIndex(a))
            let str = "\\dFourTors"
            for(let _i = 0; _i < 9; _i++){
                if(ol.indexOf(_i) >= 0){
                    str = str + "{blue}"
                }else{
                    str = str + "{}"
                }
            }
            console.log(str)
        }
    });