import { DiagonalCollection, Diagonal } from "./DiagonalCollection"


export function diagonalEqual(a:Diagonal, b:Diagonal){
    return a[0] == b[0] && a[1] == b[1]
}

/**
 * Checks if two N-diagonals are crossing.
 * 
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {boolean} is crossing
 */
export function isCrossing(a: Diagonal, b: Diagonal): boolean{
    return !(a[0]>=b[1] || a[1]<=b[0] || (a[1] <= b[1] && a[0] >= b[0]) || (b[1] <= a[1] && b[0] >= a[0]));
}

/**
 * Gets a shared endpoint of N-diagonals if exists, otherwise -1:
 *
 * @param a N-diagonal
 * @param b N-diagonal
 * @returns {number} shared endpoint
 */
export function getSharedEndpoint(a: Diagonal, b: Diagonal){
    if(a[0] == b[0] || a[0] == b[1]){ return a[0]; }
    if(a[1] == b[0] || a[1] == b[1]){ return a[1]; }
    return -1
}


export function union<T extends DiagonalCollection>(...args : T[]): T{
    if(args.length == 0){ return null; }
    if(args.length == 1){ return args[0]; }
    let unionColl = args[0].clone() as T
    for (let i = 1; i < args.length; i++) {
        for(let v of args[i].diagonals){
            if(!unionColl.contains(v)){
                unionColl.add(v);
            }
        }
    }
    return unionColl;
}


export function intersect<T extends DiagonalCollection>(...args : T[]): T{
    if(args.length == 0){ return null; }
    if(args.length == 1){ return args[0]; }
    return args[0].clone((diag) => {
        for (let i = 1; i < args.length; i++) {
            if(!args[i].contains(diag)){ return false }
        }
        return true
    }) as T
}


// A - B
export function subtract<T extends DiagonalCollection>(A: T, B: T): T{
    return A.clone((diag)=>{ return !B.contains(diag) }) as T
}

