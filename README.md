
## What is this?

This is intended to be a project that can help do calculations in negative cluster categories. 
It is build using the combinarorial model describing such negative cluster categories, 
which identifies indecomposable objects with admissible diagonals in an N-gon for a certain N. 

### What can I do with this code?

We will give some examples of things we can do, although this will _not_ be an exhaustive list of possible things.
On single objects/diagonals we can do things such as

- shift an object/diagonal,
- calculate extensions between objects,
- calculate the hom dimension between objects.

However, most if not everything revolves around the class `NegativeCCDiagonalCollection` which, as the name sugests, is a collection of admissible diagonals. 
which allows us to do the following:

- extension-close a Diagonal collection
- calculate extensions between collections,

In case we want to operate on abelian subcategories of the negative cluster category, we can do the following

- find random simple minded systems,
- close under subobjects
- close under quotiens
- close under extension
- find random torsion classes or torsion-free classes
- do HRS tilts.


## Why Typescript?
First of all, typescript is plenty fast to do the calculation I am in need of doing.
The choice of typescript is mainly based on it being able to run in a webbrowser. 
I had a hope to at one point create a website that can be used to interact with the code. 


## Examples

### Tilt
Say I want to find a proper abelian subcategory, and I want to do an HRS tilt at a random torsion pair, I might do the following

``` Typescript
    let sms = nch.randomSimpleMindedSystem(w, e);
    let alg = sms1?.extensionClose()
    let torsFreeClass = alg.findRandomTorsionFreeClass(5);
    let tiltedAlg = alg?.tilt(torsFreeClass!);
```

Now I have two abelian categories that are 1 HRS tilt apart. I can now find their associated path algebra as follows

``` Typescript
    let pathAlg = nch.pathAlgebraFromPasc(alg) as any[];
    let pathAlgTilted = nch.pathAlgebraFromPasc(tiltedAlg) as any[];
```

## Usage (TODO)
- how to build
- how to run
