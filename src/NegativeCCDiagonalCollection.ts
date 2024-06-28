import { DiagonalCollection, Diagonal } from "./DiagonalCollection"
import { isCrossing } from "./DiagonalCollectionFcts";
import * as NCC from "./NCC"



export class NegativeCCDiagonalCollection extends DiagonalCollection{

    w: number = 0;
    e: number = 0;
    N: number = 0;

    constructor(objs: Diagonal[], w:number, e:number){
        super(objs);
        this.w = w;
        this.e = e;
        this.N = (w+1)*(e+1)-2;
    }

    clone(filter: (d:Diagonal) => boolean = () => { return true; }):NegativeCCDiagonalCollection{
        return new NegativeCCDiagonalCollection([...this.diagonals].filter(filter), this.w, this.e);
    }

   isSimpleMindedSystem(){
        for(var _i = 0; _i < this.diagonals.length; _i++){
            if(this.diagonals[_i][1] <= this.diagonals[_i][0]){ return false }
            if(NCC.isWDiagonal(this.diagonals[_i], this.w))
            for(var _j = _i+1; _j < this.diagonals.length; _j++){
                if(this.diagonals[_i][0] == this.diagonals[_j][0] ||
                   this.diagonals[_i][1] == this.diagonals[_j][0] ||
                   this.diagonals[_i][1] == this.diagonals[_j][1] ||
                   this.diagonals[_i][0] == this.diagonals[_j][1] ){
                    return false
                }
                if(isCrossing(this.diagonals[_i],this.diagonals[_j])){
                    return false;
                }
            }
        }

        return true;
    }

    // TODO
    isRigid(){
        return false;
    }

    // Could improve with a faster fail if not ext closed, by implementing ext clossure here
    isExtensionClosed(){
        return this.equal(NCC.extensionClose(this))
    }
}
