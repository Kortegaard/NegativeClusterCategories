import * as nch from "../src/NCC"

function getPerf(fn, n) {
    var t0, t1;
    t0 = performance.now();
    for (var i = 0; i < n; i++) { fn() }
    t1 = performance.now();
    return [t1 - t0, (t1-t0)/n];
}

//console.log(getPerf(() => nch.randomSimpleMindedSystem3(300,400), 10))
console.log(getPerf(() => nch.randomSimpleMindedSystem(300,400,100000),  1))