
import { DiagonalCollection, Diagonal } from "./DiagonalCollection"
import * as diag from "./DiagonalCollectionFcts"
import { NegativeCCDiagonalCollection } from "./NegativeCCDiagonalCollection";

/**
 * Suspension of N-diagonal.
 * 
 * @param s : N-Diagonal
 * @param N : Number of vertices
 * @returns ∑s
 */
export function Sigma(s:NegativeCCDiagonalCollection):NegativeCCDiagonalCollection;
export function Sigma(s:NegativeCCDiagonalCollection, power:number):NegativeCCDiagonalCollection;
export function Sigma(s:Diagonal, N:number, power:number):Diagonal;
export function Sigma(s:Diagonal, N:number):Diagonal;
export function Sigma(s:NegativeCCDiagonalCollection | Diagonal, N?:number, power?:number):unknown{
    if(N && !(s instanceof NegativeCCDiagonalCollection) && typeof N == "number"){
        if(power === undefined){ power = 1 }
        if(!(s instanceof NegativeCCDiagonalCollection)){
            const n: Diagonal = [(s[0]+power) % N, (s[1]+power) % N];
            if(n[0]<n[1]){ return n; }
            return [n[1], n[0]];
        }
    }
    if(s instanceof NegativeCCDiagonalCollection){
        const objs = []
        for(let diag of s.diagonals){
            objs.push(Sigma(diag, s.N, N)) // Notice N here is the power
        }
        let a = new NegativeCCDiagonalCollection(objs, s.w, s.e)
        return a
    }
}

/**
 * is N-Cylic ordered: n1 < n2 < n3.
 * 
 * @param n1 element in Z/NZ
 * @param n2 element in Z/NZ
 * @param n3 element in Z/NZ
 * @param N Number of vertices
 * @returns boolean
 */
export function isNOrdered(n1: number, n2: number, n3: number, N: number): Boolean{
    let d = Ndist(n1, n3, N);
    return (Ndist(n1, n2, N) < d && Ndist(n2, n3, N) < d);
}

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
    return -1;
}

/**
 * Calculates k dimension of hom space hom(s1,s2) in C_{-w}(A_e).
 * 
 * @param s1 N-diagonals 
 * @param s2 N-diagonals 
 * @param w  w 
 * @param e  e
 * @returns Dimension of hom(s1,s2) in C_{-w}(A_e)
 */
export function homDim(s1:Diagonal, s2:Diagonal, w:number, e:number){
    const N = (w+1)*(e+1)-2;
    const sig: Diagonal = Sigma(s1, N);
    if(s1[0] === s2[0] && s1[1] === s2[1]){ return 1; }
    if(s1[0] === s2[0] && (Ndist(s1[1], s2[1], N)) % (w+1) === 0 && !diag.isCrossing(s2, sig)){ return 1; }
    if(s1[1] === s2[0] && (Ndist(s1[0], s2[1], N)) % (w+1) === 0 && !diag.isCrossing(s2, sig)){ return 1; }
    if(s1[0] === s2[1] && (Ndist(s1[1], s2[0], N)) % (w+1) === 0 && !diag.isCrossing(s2, sig)){ return 1; }
    if(s1[1] === s2[1] && (Ndist(s1[0], s2[0], N)) % (w+1) === 0 && !diag.isCrossing(s2, sig)){ return 1; }
    
    if(diag.isCrossing(s2, sig) && diag.getSharedEndpoint(s2,s1)==-1){ 
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

/**
 * Checks if N-diagonal is w admissible
 *
 * @param a N-diagonal
 * @param w w
 * @returns {boolean}
 */
export function isWDiagonal(a: Diagonal, w: number): boolean{
    return (( (a[1] - a[0]) + 1 )% (w + 1)  == 0);
}

// e's in article fig 11. 
export function getDiagonalDifferenece(a: Diagonal, b: Diagonal, N:number){
    const objs:Diagonal[] = [];

    let currIndex = 0;
    if(a.includes(b[currIndex])){
        currIndex = 1;
    }

    for(var _j = currIndex; _j < 2; _j++){
        for(var _i = b[_j] + 1; _i < b[_j] + N; _i++){
            if( b.includes(_i % N) ){
                break;
            }
            if( a.includes(_i % N) ){
                objs.push([b[_j], _i % N].sort((n1,n2) => n1 - n2) as Diagonal);
                break;
            }
        }
    }

    return objs;
}

// find exts a --> b --> c, returns [b]
export function ext(c: Diagonal, a:Diagonal, w:number, N:number){
    if( diag.isCrossing(c,a) || ( !diag.isCrossing(c,a) && diag.getSharedEndpoint(Sigma(a, N), c) >= 0 ) ){
        //There is an extension
        let diff:Diagonal[] = getDiagonalDifferenece(a,c, N);

        // Check if it is w diagonals
        if(diff.every((curVal) => isWDiagonal(curVal, w))){
            return diff;
        }
    }
    return [];
}


export function extensionClose(A: NegativeCCDiagonalCollection){
    let res: NegativeCCDiagonalCollection = new NegativeCCDiagonalCollection([...A.diagonals], A.w, A.e);
    let somethingAdded: Boolean = false;
    while(true){
        somethingAdded = false;
        for(let x of res.diagonals){
            for(let y of res.diagonals){
                if(x == y){ continue; }
                let e = ext(x, y, A.w, A.N);
                for(let z of e){
                    if(!res.contains(z)){ res.add(z); }
                }
            }
        }
        if(!somethingAdded){ break; }
    }
    return res;
}



export function randomSimpleMindedSystem2(w:number, e:number, num_attempts = 10): NegativeCCDiagonalCollection{
    const N: number = (e+1) * (w+1) - 2;

    function getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function numberArray(from: number, to:number){
        return Array.from({length: to-from+1}, (_, index) => index + from)
    }

    function helper(d1 = undefined, d2 = undefined){
        //
        //

    }

    function helper2(polygon: number[], taken: number[]){
        let a1 = polygon.filter((d) => taken.indexOf(d) == -1)
        if(a1.length < 2){ return [] }
        const random_diag_start = a1[Math.floor(Math.random() * a1.length)]
        let possiblePartners = polygon.filter((n) => {
            if(n == random_diag_start){ return false }
            return (Math.abs(n-random_diag_start) + 1) % (w + 1)
        })
        const random_partner = possiblePartners[Math.floor(Math.random() * possiblePartners.length)]
        let diag = [random_diag_start, random_partner].sort((a, b)=>{return b-a})
        // Need to find polygon that this diagonal split the original into
    }
    let h = helper(numberArray(0,N-1), [])
    return new NegativeCCDiagonalCollection([],3,4)
}




export function randomSimpleMindedSystem(w:number, e:number, num_attempts = 10): NegativeCCDiagonalCollection{
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
    
    for(let i = 0; i < num_attempts; i++){
        let sms = new NegativeCCDiagonalCollection(helper(0, N-1, true),w,e);
        if(sms.isSimpleMindedSystem()){
            return sms;
        }
    }

    return null;
}

// Need test
/**
 * Is the hom space between two colletions non-zero
 * 
 * @param A Collection of N-diagonals
 * @param B Collection of N-diagonals
 * @returns boolean
*/
function isHomBetweenCollections(from: NegativeCCDiagonalCollection, to: NegativeCCDiagonalCollection): boolean{
    for(let x of from.diagonals){
        for(let y of to.diagonals){
            if(homDim(x, y, from.w, to.e) > 0){
                return true;
            }
        }
    }
    return false;
}

// Need test
export function isEn(coll: NegativeCCDiagonalCollection, n: number){
    let a = new NegativeCCDiagonalCollection(coll.diagonals, coll.w, coll.e);

    for(let i = 0; i<n; i++){
        a = Sigma(a);
        if(isHomBetweenCollections(a, coll)){ return false; }
    }
    return true
}

export function extension(A: NegativeCCDiagonalCollection, B: NegativeCCDiagonalCollection): NegativeCCDiagonalCollection{
    let a: NegativeCCDiagonalCollection = diag.union(A, B);
    
    for(let x of A.diagonals){
        for(let y of B.diagonals){
            if(diag.diagonalEqual(x,y)){ continue; }
            // Find e's such that: x ---> e ---> y, or rather a ---> e ---> b
            let e = ext(y, x, A.w, A.N);
            for(let z of e){
                if(!a.contains(z)){ a.add(z); }
            }
        }
    }
    return a;
}

export function leftPerp(of:NegativeCCDiagonalCollection, inColl:NegativeCCDiagonalCollection){
    return inColl.clone((diag) => {
        for(let ofDiag of of.diagonals){
            if(homDim(diag, ofDiag, inColl.w, inColl.e) > 0){
                return false
            }
        }
        return true
    })
}

// Set^perp
export function rightPerp(of:NegativeCCDiagonalCollection, inColl:NegativeCCDiagonalCollection){
    return inColl.clone((diag) => {
        for(let ofDiag of of.diagonals){
            if(homDim(ofDiag, diag, inColl.w, inColl.e) > 0){
                return false
            }
        }
        return true
    })
}

export function filtGen(set: NegativeCCDiagonalCollection, alg: NegativeCCDiagonalCollection){
    return leftPerp(rightPerp(set, alg), alg)
}

export function filtSub(set: NegativeCCDiagonalCollection, alg: NegativeCCDiagonalCollection){
    return rightPerp(leftPerp(set, alg), alg)
}