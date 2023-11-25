
export type Diagonal = [number, number]

export class DiagonalCollection{

    diagonals: Diagonal[] = [];

    constructor(objs: Diagonal[]){
        for(var k of objs){
            this.add(k);
        }
    }

    clone(filter: (d:Diagonal) => boolean = () => { return true; }){
        return new (<any>this.constructor)([...this.diagonals].filter(filter));
    }

    toString(): string{
        return this.diagonals.map(a => "(" + a.toString() + ")").toString()
    }

    add(obj: Diagonal){
       this.diagonals.push(obj);
    }

    containsSet(objs: Diagonal[]){
        for(let v of objs){
            if(!this.contains(v)){ return false; }
        }
        return true;
    }

    contains(obj: Diagonal){
        const i = this.find(obj);
        if(i < 0){ return null; }
        return this.diagonals[i];
    }

    // Returns index
    find(obj: Diagonal){
        for(var _i = 0; _i < this.diagonals.length; _i++){
            if(this.diagonals[_i][0] == obj[0] && this.diagonals[_i][1] == obj[1]){
                return _i;
            }
        }
        return -1;
    }

    removeIndex(index: number){ }

    removeObject(index: number){ }

    equal(A: DiagonalCollection){
        return this.containsSet(A.diagonals) && A.containsSet(this.diagonals);
    }

    isExtensionClosed(){
        return this.equal(this.extensionClose());
    }

    extensionClose(){
        console.warn("Not implemented! Not relavant now")
        return null;
    }
}
