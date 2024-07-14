// Checking the following hypothesis:
//
// Is it true that given a simple minded system S,
// in the negative cluster category C_{-w}(A_e)
// then <S> will always satisfy E_{w-1}
//
//
//

import * as ncc from "../src/NCC"

var isMyGuessCorrect = true
let times = 100000
for (var i = 0; i < times; i++){
    // Finding two random numbers
    var random_w =  Math.floor(Math.random() * 18) + 2;
    var random_e =  Math.floor(Math.random() * 18) + 2;
    
    // Generate a random proper abelian subcategory from an sms.
    var sms = ncc.randomSimpleMindedSystem3(random_w, random_e)
    var A = ncc.extensionClose(sms)

    // Finding
    isMyGuessCorrect &&= ncc.isEn(A, random_w-1)
}
console.log("Is my guess correct?", isMyGuessCorrect);
