"use strict";
exports.__esModule = true;
var nch = require("../../src/NCC");
function getIrreducibleMorphismPlus(diagonal, move_diag_index, w, e, sort) {
    if (sort === void 0) { sort = true; }
    var N = (w + 1) * (e + 1) - 2;
    //let move_diag_index = 0;
    var new_diag = [0, 0];
    new_diag[move_diag_index] = (diagonal[move_diag_index] + (w + 1)) % N;
    new_diag[1 - move_diag_index] = diagonal[1 - move_diag_index];
    if (nch.isWDiagonal([new_diag[0], new_diag[1]].sort(), w)) {
        if (sort) {
            new_diag.sort();
        }
        return new_diag;
    }
    return false; // If there is no such one
}
//function getIrreducibleMorphismPlus(diagonal: Diagonal, w: number, e: number) {
//    const N = (w+1)*(e+1)-2;
//    //console.log("N", N);
//    let move_diag_index = 1;
//    let new_diag: Diagonal = [0,0];
//    new_diag[move_diag_index] = (diagonal[move_diag_index] + (w+1)) % N;
//    new_diag[1 - move_diag_index] = diagonal[1-move_diag_index];
//    if(nch.isWDiagonal(new_diag,w)){
//        return new_diag;
//    }
//    return false; // If there is no such one
//}
//console.log(nch.isWDiagonal([2,21],3))
console.log(getIrreducibleMorphismPlus([6, 17], 1, 3, 4, false));
//console.log(getIrreducibleMorphismPlus([2,17],0,3,4), getIrreducibleMorphismPlus([2,17],1,3,4))
//console.log(getIrreducibleMorphismPlus([6,17],0,3,4), getIrreducibleMorphismPlus([6,17],1,3,4))
//console.log(getIrreducibleMorphismPlus([10,17],0,3,4), getIrreducibleMorphismPlus([10,17],1,3,4))
//console.log(getIrreducibleMorphismPlus([14,17],0,3,4), getIrreducibleMorphismPlus([14,17],1,3,4))
