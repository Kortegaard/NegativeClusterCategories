export let verbose: boolean = true
export function setVerbose(val: boolean){ verbose = val; }

// Transferred
/**
 * Suspension of N-diagonal.
 * 
 * @param s : N-Diagonal
 * @param N : Number of vertices
 * @returns ∑s
 */
export function Sigma(s:any[], N:number, power:number = 1){
    if(power === undefined){
        power = 1
    }
    const n: number[] = [(s[0]+power) % N, (s[1]+power) % N];
    if(n[0]<n[1]){return n}
    return [n[1], n[0]];
}

// Transferred
/**
 * is N-Cylic ordered: n1 < n2 < n3.
 * 
 * @param n1 element in Z/NZ
 * @param n2 element in Z/NZ
 * @param n3 element in Z/NZ
 * @param N Number of vertices
 * @returns boolean
 */
export function isNOrdered(n1: number, n2: number, n3: number, N: number){
    let d = Ndist(n1, n3, N);
    return (Ndist(n1, n2, N) < d && Ndist(n2, n3, N) < d);
}

// Transferred
/**
 * Calculates a clock-wise "distance" from a to b.
 * Can also be seen as "distance" Z/NZ, is b-a if b is the least representative of [b], such that b>a.
 * 
 * @param a element in Z/NZ
 * @param b element in Z/NZ
 * @param N Number of vertices
 * @returns {number} Distance as described above.
 */
export function Ndist(a:number,b:number, N:number){
    if(b == a){ return 0}
    if(b > a){ return b-a }
    if(b < a){ return N - a + b }
    console.error("you screwed something up")
    return -1;
}

// Transferred
/**
 * Calculates k dimension of hom space hom(s1,s2) in C_{-w}(A_e).
 * 
 * @param s1 N-diagonals 
 * @param s2 N-diagonals 
 * @param w  w 
 * @param e  e
 * @returns Dimension of hom(s1,s2) in C_{-w}(A_e)
 */
export function homDim(s1:any[], s2:any[], w:number, e:number){
    const N = (w+1)*(e+1)-2;
    const sig: number[] = Sigma(s1, N);
    if(s1[0] === s2[0] && s1[1] === s2[1]){ return 1; }
    if(s1[0] === s2[0] && (Ndist(s1[1], s2[1], N)) % (w+1) === 0 && !isCrossing(s2, sig)){ return 1; }
    if(s1[1] === s2[0] && (Ndist(s1[0], s2[1], N)) % (w+1) === 0 && !isCrossing(s2, sig)){ return 1; }
    if(s1[0] === s2[1] && (Ndist(s1[1], s2[0], N)) % (w+1) === 0 && !isCrossing(s2, sig)){ return 1; }
    if(s1[1] === s2[1] && (Ndist(s1[0], s2[0], N)) % (w+1) === 0 && !isCrossing(s2, sig)){ return 1; }
    
    if(isCrossing(s2, sig) && getSharedEndpoint(s2,s1)==-1){ 
        if(
            isNOrdered(sig[0],sig[1], s2[0], N) &&  (Ndist(s2[0], sig[0], N)) % (w+1) === 0 &&
            (Ndist(s2[1], sig[1], N)) % (w+1) === 0 
        ){ return 1; }
        if(
            isNOrdered(sig[0],sig[1], s2[1], N) &&  (Ndist(s2[1], sig[0], N)) % (w+1) === 0 &&
            (Ndist(s2[0], sig[1], N)) % (w+1) === 0 
        ){ return 1; }
    }
    return 0;
}

// Transferred
/**
 * Checks if two N-diagonals are crossing.
 * 
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {boolean} is crossing
 */
export function isCrossing(a: any[], b: any[]): boolean{
    return !(a[0]>=b[1] || a[1]<=b[0] || (a[1] <= b[1] && a[0] >= b[0]) || (b[1] <= a[1] && b[0] >= a[0]));
}

// Transferred
/**
 * Gets a shared endpoint of N-diagonals if exists, otherwise -1:
 *
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {number} shared endpoint
 */
export function getSharedEndpoint(a: any[], b: any[]){
    if(a[0] == b[0]){ return a[0]; }
    if(a[0] == b[1]){ return a[0]; }
    if(a[1] == b[0]){ return a[1]; }
    if(a[1] == b[1]){ return a[1]; }
    return -1
}

// Transferred
/**
 * Checks if N-diagonal is w admissible
 *
 * @param a N-diagonal
 * @param w w
 * @returns {boolean}
 */
export function isWDiagonal(a: any[], w: number): boolean{
    return (( (a[1] - a[0]) + 1 )% (w + 1)  == 0);
}

//transferred
/**
 * Is the hom space between two colletions non-zero
 * 
 * @param A Collection of N-diagonals
 * @param B Collection of N-diagonals
 * @returns boolean
*/
export function isHomBetweenCollections(A: CwObjectCollection, B: CwObjectCollection): boolean{
    for(let x of A.objectList){
        for(let y of B.objectList){
            if(homDim(x, y, A.w, A.e) > 0){
                return true;
            }
        }
    }
    return false;
}

// Transferred
// e's in article fig 11. 
// Doesnt check if w-diagonal
export function getDiagonalDifferenece(a: any[], b: any[], N:number){
    const objs:[number,number][] = [];

    let currIndex = 0;
    if(a.includes(b[currIndex])){
        currIndex = 1;
    }


    // NCH.ext([4,11],[0,7]);
    for(var _j = currIndex; _j < 2; _j++){
        for(var _i = b[_j] + 1; _i < b[_j] + N; _i++){
            if( b.includes(_i % N) ){
                break;
            }
            if( a.includes(_i % N) ){
                objs.push([b[_j], _i % N].sort((n1,n2) => n1 - n2) as [number, number]);
                break;
            }
        }
    }

    return objs;
}

// Transferred
// find exts a --> b --> c, returns [b]
export function ext(c: [number, number], a:[number, number], w:number, N:number){
    if( isCrossing(c,a) || ( !isCrossing(c,a) && getSharedEndpoint(Sigma(a, N), c) >= 0 ) ){
        //There is an extension
        let diff:[number, number][] = getDiagonalDifferenece(a,c, N);

        // Check if it is w diagonals
        if(diff.every((curVal) => isWDiagonal(curVal, w))){
            return diff;
        }
    }
    return [];
}

export function objectEqual(a:any[], b:any[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
}

// ^{perp}set
export function leftPerpInCollection(set:CwObjectCollection, inColl:CwObjectCollection){
    let perp:[number,number][] = []

    for(let collElem of inColl.objectList){
        let is_zero = true
        for(let setElem of set.objectList){
            if(homDim(collElem, setElem, inColl.w, inColl.e) > 0){
                is_zero = false
            }
        }
        if(is_zero){ perp.push(collElem); }
    }
    return new CwObjectCollection(perp, inColl.w, inColl.e);
}

// Set^perp
export function rightPerpInCollection(set:CwObjectCollection, inColl:CwObjectCollection){
    let perp:[number,number][] = []

    for(let collElem of inColl.objectList){
        let is_zero = true
        for(let setElem of set.objectList){
            if(homDim(setElem, collElem, inColl.w, inColl.e) > 0){
                is_zero = false
            }
        }
        if(is_zero){ perp.push(collElem); }
    }
    return new CwObjectCollection(perp, inColl.w, inColl.e);
}

// Transferred
export class CwObjectCollection{
    objectList: [number, number][] = [];

    w: number = 0;
    e: number = 0;
    N: number = 0;

    constructor(objs: [number, number][], w:number, e:number){
        this.w = w;
        this.e = e;
        this.N = (w+1)*(e+1)-2;
        for(var k of objs){
            this.add(k);
        }
    }
    //transfered
    toString(): string{
        return this.objectList.map(a => "(" + a.toString() + ")").toString()
    }

    //transfered
    add(obj: [number, number]){
       this.objectList.push(obj);
    }

    //transfered
    containsSet(objs: [number, number][]){
        for(let v of objs){
            if(!this.contains(v)){
                return false;
            }
        }
        return true;
    }

    //transfered
    contains(obj: [number, number]){
        const i = this.find(obj);
        if(i < 0){
            return null;
        }
        return this.objectList[i];
    }

    //transfered
    // Returns index
    find(obj: [number, number]){
        for(var _i = 0; _i < this.objectList.length; _i++){
            if(this.objectList[_i][0] == obj[0] && this.objectList[_i][1] == obj[1]){
                return _i;
            }
        }
        return -1;
    }

    //transfered
    isSimpleMindedSystem(){
        for(var _i = 0; _i < this.objectList.length; _i++){
            for(var _j = _i+1; _j < this.objectList.length; _j++){
                if(this.objectList[_i][0] == this.objectList[_j][0] ||
                   this.objectList[_i][1] == this.objectList[_j][0] ||
                   this.objectList[_i][1] == this.objectList[_j][1] ||
                   this.objectList[_i][0] == this.objectList[_j][1] ){
                    return false
                }
                if(isCrossing(this.objectList[_i],this.objectList[_j])){
                    return false;
                }
            }
        }

        return true;
    }

    // Transferred
    isExtensionClosed(){
        return collectionEqual(this, this.extensionClose());
    }

    // Transferred
    extensionClose(){
        let a: CwObjectCollection = new CwObjectCollection(this.objectList, this.w, this.e);
        let somethingAdded: Boolean = false;
        while(true){
            somethingAdded = false;
            for(let x of a.objectList){
                for(let y of a.objectList){
                    if(x == y){ continue; }
                    let e = ext(x, y, this.w, this.N);
                    for(let z of e){
                        if(!a.contains(z)){ a.add(z); }
                    }

                }
            }
            if(!somethingAdded){ break; }
        }
        return a;
    }

    tilt(torsionFree:CwObjectCollection){
        let torsion = leftPerpInCollection(torsionFree, this)
        return extension(torsionFree.Sigma(), torsion);
    }

    Sigma(power:number = 1){
        let a: CwObjectCollection = new CwObjectCollection([], this.w, this.e);
        for(let ob of this.objectList){
            a.add(Sigma(ob, this.N, power) as [number, number]);
        }
        return a;
    }

    // Should be a pasc for this to be used.
    findRandomTorsionFreeClass(sead_size: number = 1){
        const num = Math.floor(Math.random() * (this.objectList.length - 1 + 1) + 1)
        const shuffled = this.objectList.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, num);
        return filtSub(new CwObjectCollection(selected,this.w, this.e), this)
    }
}

export function filtGen(set: CwObjectCollection, alg: CwObjectCollection){
    return leftPerpInCollection(rightPerpInCollection(set, alg), alg)
}

export function filtSub(set: CwObjectCollection, alg: CwObjectCollection){
    return rightPerpInCollection(leftPerpInCollection(set, alg), alg)
}

//Transfered
export function intersection(A: CwObjectCollection, B: CwObjectCollection){
    if(A.w != B.w || A.e != B.e){
        console.warn("Collection doesn't compare");
        return null;
    }
    

    let collectedObjs: [number, number][] = [];
    for(let v of A.objectList){
        if(B.contains(v)){
            collectedObjs.push(v);
        }
    }
    let a: CwObjectCollection = new CwObjectCollection(collectedObjs, A.w, A.e);
    return a;

}

//Transfered
export function union(A: CwObjectCollection, B: CwObjectCollection){
    if(A.w != B.w || A.e != B.e){
        console.warn("Collection doesn't compare");
        return null;
    }

    let collectedObjs: [number, number][] = [...A.objectList];
    for(let v of B.objectList){
        if(!A.contains(v)){
            collectedObjs.push(v);
        }
    }

    let a: CwObjectCollection = new CwObjectCollection(collectedObjs, A.w, A.e);
    return a;
}

//Transfered
export function collectionEqual(A: CwObjectCollection, B: CwObjectCollection){
    return A.containsSet(B.objectList) && B.containsSet(A.objectList);
}

// Compute A * B
export function extension(A: CwObjectCollection, B: CwObjectCollection){
    let a: CwObjectCollection | null = union(A, B);
    if(a === null){ return null; }
    
    for(let x of A.objectList){
        for(let y of B.objectList){
            if(objectEqual(x,y)){ continue; }
            // Find e's such that: x ---> e ---> y, or rather a ---> e ---> b
            let e = ext(y, x, A.w, A.N);
            for(let z of e){
                if(!a.contains(z)){ a.add(z); }
            }
        }
    }
    return a;
}

export function pathAlgebraFromPasc(pasc: CwObjectCollection){
    // We can find potential projectives as objects with no extensions out
    let potentialProjectives: [number,number][] = []

    // Finding projectives
    for(var _i = 0; _i < pasc.objectList.length; _i++){
        //const ob = new CwObjectCollection([pasc.objectList[_i]], pasc.w, pasc.e)
        let are_ext_out = false;
        for(var _j = 0; _j < pasc.objectList.length; _j++){
            const exts = ext(pasc.objectList[_i], pasc.objectList[_j], pasc.w, pasc.N)
            if(exts.length > 0){
                are_ext_out = true;
                break;
            }
        }
        if(are_ext_out){ continue; }
        potentialProjectives.push(pasc.objectList[_i]);
    }

    //finding arrows
    let arrows: [number,number][]  = [];
    for(var _i = 0; _i < potentialProjectives.length; _i++){
        for(var _j = 0; _j < potentialProjectives.length; _j++){
            if(_i == _j){continue}
            const hd_i_j = homDim(potentialProjectives[_i], potentialProjectives[_j], pasc.w, pasc.e)
            if(hd_i_j > 0){
                let factors = false
                for(var _k = 0; _k < potentialProjectives.length; _k++){
                    if(_k == _i || _k == _j){ continue }
                    const hd_i_k = homDim(potentialProjectives[_i], potentialProjectives[_k], pasc.w, pasc.e)
                    const hd_k_j = homDim(potentialProjectives[_k], potentialProjectives[_j], pasc.w, pasc.e)
                    if(hd_i_k > 0 && hd_k_j > 0){
                        factors = true
                        break
                    }
                }
                if(!factors){ arrows.push([_j,_i]) }
            }
        }
    }

    //finding Zero relations
    const compositions = [];
    let curr_index  = 0
    const ideal = []

    // Add initiial arrows
    for(let i = 0; i < arrows.length; i++){
        compositions.push([i])
    }

    while(curr_index < compositions.length){
        for(let i = 0; i < arrows.length; i++){
            // Making sure composition is possible , x --f--> y --g--> z , gives  P(x) <--p(f)-- p(y) <--p(g)-- p(z)
            if(arrows[compositions[curr_index][compositions[curr_index].length - 1]][1] != arrows[i][0]){ continue; }

            const x_index = arrows[compositions[curr_index][compositions[curr_index].length - 1]][0]
            const y_index = arrows[compositions[curr_index][compositions[curr_index].length - 1]][1]
            const z_index = arrows[i][1]

            const x = potentialProjectives[x_index]
            const z = potentialProjectives[z_index]

            const comp_homdim = homDim(z,x, pasc.w, pasc.e)

            if(comp_homdim == 0){
                ideal.push([...compositions[curr_index], i]);
            }else{
                //compositions[curr_index].push(i)
                compositions.push([...compositions[curr_index], i]);
            }
        }
        curr_index += 1;
    }

    // Finding the corresponding simples
    // There will be a simple for each projective,
    // and it will be the objects that has arrows from one and only that corresponding projective
    // todo: I think the above is true
    
    //This can be improved, but something fast for proof of concept
    let proj_corresponding_simples = {}
    for(let i = 0; i < pasc.objectList.length; i++){
        let has_morphisms_from = []
        for(let j = 0; j < potentialProjectives.length; j++){
            const hd = homDim(potentialProjectives[j], pasc.objectList[i], pasc.w, pasc.e);
            if(hd > 0){
                has_morphisms_from.push(j)
            }
        }
        if(has_morphisms_from.length == 1){
            if(has_morphisms_from[0] in proj_corresponding_simples){
                console.log("something wrong here")
            }
            proj_corresponding_simples[has_morphisms_from[0]] = pasc.objectList[i]
        }
    }
    const sms_objects = []
    for(let a in proj_corresponding_simples){
        sms_objects.push(proj_corresponding_simples[a])
    }
    let sms = new CwObjectCollection(sms_objects, pasc.w, pasc.e)

    return [arrows, ideal, sms]
}

export function pathAlgebra(sms: CwObjectCollection){
    if(!sms.isSimpleMindedSystem()){
        return null;
    }
    
    const ideal                      = [];
    const arrows: [number,number][]  = [];
    const compositions               = [];
    const composition_module         = [];

    // Create list of arrows
    var _hd = 0;
    for(var _i = 0; _i < sms.objectList.length; _i++){
        for(var _j = 0; _j < sms.objectList.length; _j++){
            // Arros from _i to _j
            _hd = homDim(sms.objectList[_j],Sigma(sms.objectList[_i], sms.N), sms.w, sms.e);
            for(var _k = 0; _k < _hd; _k++){
                //arrows.push([_i, _j]);
                arrows.push([_j, _i]);
            }
        }
    }

    // Start composition list wiht arrows
    var tempIndex = 0;
    for(var _i = 0; _i < arrows.length; _i++){
        let e1  = ext(sms.objectList[arrows[_i][0]], sms.objectList[arrows[_i][1]], sms.w, sms.N);
        if(e1.length == 1){
            compositions.push([_i]);
            composition_module.push(e1[0]);
        }else{
            console.log("There Is Some Kind Of ERROR");
        }
    }

    // Calculating zero relations / Ideal
    while(tempIndex != compositions.length){
        //console.log(temIndex, compositions.length);
        let cl = compositions.length;
        for(var _i = 0; _i < arrows.length; _i++){
            for(var _j = tempIndex; _j < compositions.length; _j++){
                // Make sure endpoint agree
                if(arrows[_i][1] != arrows[compositions[_j][0]][0]){ continue ;}

                // j*i makes sense:, check jf 
                // arrows[_i][0]  -- i --> arrows[_i][1]  -- j --> arrows[compositions[_j].last][1]
                // is non-zero
                const newComp: number[] = [_i, ...compositions[_j]];

                // PROBLEM : ONLY WORK FOR An
                let e2  = ext(composition_module[_i], composition_module[_j], sms.w, sms.N);
                if(e2.length == 0){
                    //Composition of arrows is 0
                    ideal.push(newComp);
                }
                if(e2.length >= 1){
                    // Composition exists, and i non-zero
                    compositions.push(newComp);
                }
            }
        }
        tempIndex = cl;
    }
    return [arrows, ideal];

}

export function* generateIndecomposables(w:number,e:number) {
    const N: number = (e+1)*(w+1)-2;
    for(var i = 0 ; i < N; i++){
        for(var j = 1 ; j < (e+1); j++){
            const add = j*(w+1);
            yield [i , (i-1+add) % N].sort((n1,n2) => n1 - n2)
        }
    }
}

function* elements() {
    var i = 0;
    while(true) {
        yield i++;
    }
}

// Arrows 0 indexes
export function qpa(numVertices:number, arrows:number[][], ideal:number[][]){
    let out: string = "Read(\"./SupportTauTiltingMutation.g\");\n";
    let arrString: string = "[" + arrows.map((d,i)=> "["+d.map(b=>(b+1)).toString() + ", \"a"+ i + "\"]").toString() + "]";
    out += "Q := Quiver(" + numVertices + ", " + arrString + ");\n";
    out += "kQ := PathAlgebra(GF(3), Q);\n"
    out += "I := Ideal(kQ, [" + ideal.map( d =>  d.map(b => "kQ.a" + b).join("*")).join(",") + "]);\n";
    out += "IsAdmissibleIdeal(I);\n";
    out += "A := kQ/I;\n"
    out += "Display(TorsionFreeClasses(A));\n"
    return out
}

export function dimensionVectorToObject(sms:CwObjectCollection, dimensionvect:number[]){

    let object = null;
    //console.log(objectVec);
    let somethingHappening = true;
    while(dimensionvect.some(v=>v!=0)){
        if(!somethingHappening){
            //console.log("something went realy wrong");
            //break;
        }
        somethingHappening = false;
        for(let i = 0; i < dimensionvect.length; i++){
            if(dimensionvect[i] != 1){ continue; }
            if(object == null){
                object = sms.objectList[i];
                dimensionvect[i] = 0;
                continue;
            }

            let e1 = ext(object, sms.objectList[i],sms.w,sms.N);
            let e2 = ext(sms.objectList[i], object,sms.w,sms.N);
            if(e1.length + e2.length != 1){
                //console.warn("SOMETHING WRONG", e1, e2);
                continue;
            }
            if(e1.length == 1){
                object = e1[0];
            }else if(e2.length == 1){
                object = e2[0];
            }
            somethingHappening = true;
            dimensionvect[i] = 0
        }
    }
    return object
}

export function qpaTorsionClasses(sms:CwObjectCollection): Promise<any> {

    //let A = pathAlgebra(sms);
    let alg = sms.extensionClose()
    let A = pathAlgebraFromPasc(alg) as any[];

    let numVertices:number = sms.e;
    let arrows:number[][] = A![0];
    let ideal:number[][] = A![1];

    // QPA code to get torsion clasees from GAP
    let mystr = qpa(numVertices, arrows, ideal)

    // Execute Gap program to get torsion classes
    const { exec } = require("child_process");

    let res : string  = "";
    let resArr : number[][] = [];

    return new Promise((resolve) => {
        //let qpaCode = "cd /mnt/c/Users/ander/OneDrive/Dokumenter/Code/GAP-QPA/scripts && gap --nointeract -b -c '" + mystr +"'";
        let qpaCode = "cd /Users/ank/master/drive/code/qpa_scripts && gap --nointeract -b -c '\n" + mystr +"'";
        if(verbose){
            console.log("* Calling QPA code:")
            console.log(qpaCode)
        }
        exec(qpaCode, (error:any, stdout:any, stderr:any) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            res = stdout;
            res = res.replace(/\\/gi, '').replace(/\n/gi,'');
            resArr = JSON.parse(res);

            //resolve(resArr.filter(d=>d.length > 0));
            resolve(resArr)
        });
    })
    // Converts to CwObjectCollections
    .then(el=> {
        // Torsion pairs
        let tp    = (el as any[])[0]
        // order + Convert to 0 index
        let order = (el as any[][])[1].map(a => [a[0]-1, a[1]-1])

        // Convert torsion classes to CWObjectCollection (i.e. to objects)
        let torsionFreeClassCollectionArray: CwObjectCollection[] = [];
        for(let torsionFreeClass of tp as number[][][]){
            let torsionFreeClassCollection = new CwObjectCollection([], sms.w, sms.e);
            for(let objectVec of torsionFreeClass as number[][]){
                torsionFreeClassCollection.add(dimensionVectorToObject(sms, objectVec)!);
            }
            torsionFreeClassCollectionArray.push(torsionFreeClassCollection);
        }
        return new Promise((resolve)=>{resolve([torsionFreeClassCollectionArray, order])});
    });
}

// Transferred
export function randomSimpleMindedSystem(w:number, e:number){
    const N: number = (e+1) * (w+1) - 2;

    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function helper(start:number, end:number, first:boolean):[number, number][]{
        if((end - start + 1) < (w+1)){
            return []
        }
        let l = getRndInteger(start, start + w - 1 );
        if(first){ l = 0; }
        const random_length = getRndInteger(1, Math.floor((end-l+1)/(w+1))+1)*(w+1);

        const endPoint = random_length-1+l;
        return [[l, endPoint],...helper(l+1,endPoint - 1, false), ...helper(endPoint + 1, end, false)];
    }
    
    for(let i = 0; i < 10; i++){
        let sms = new CwObjectCollection(helper(0, N-1, true),w,e);
        //console.log("sms", sms)
        if(sms.isSimpleMindedSystem()){
            return sms;
        }
    }

    return null;
}

export function isEn(sms: CwObjectCollection, n: number){
    let a = new CwObjectCollection(sms.objectList, sms.w, sms.e);

    for(let i = 0; i<n; i++){
        a = a.Sigma();
        if(isHomBetweenCollections(a, sms)){ return false; }
    }
    return true
}

export function ext2Agree(sms: CwObjectCollection){
    const sd = sms.Sigma();
    const dAsd = extension(sd,sms);
    const sdAd = extension(sms,sd);

    return collectionEqual(dAsd!,sdAd!);
}

//let d = new CwObjectCollection([[6,8],[3,11],[1,12],[4,9]],2,4);
//console.log(d.isSimpleMindedSystem());
//console.log(homDim([4,9],[7,9],2,4));

//let d = new CwObjectCollection([[3,5],[1,6],[7,9]],2,3);
//Assumes An



//qpaTorsionClasses(d)
//    .then(s=>{
//        for(let f of s as any[]){
//            console.log(f.isExtensionClosed() ,f)
//        }
//    });


