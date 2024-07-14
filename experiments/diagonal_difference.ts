
import * as ncc from "../src/NCC"
import * as nc from "../src/NegativeCCDiagonalCollection"

let A = new nc.NCCDiagonalCollection([[1,4], [1,8], [1,12], [5,8], [5,12], [9,12]], 3,4)
let X = new nc.NCCDiagonalCollection([[1,4], [1,8]], 3,4)

console.log(ncc.tilt(A,X))

