import {Diagonal, DiagonalCollection} from '../src/DiagonalCollection';
import * as dc from '../src/DiagonalCollectionFcts';

describe('Testing Diagonal Collection and corresponding functions', () => {

    const d1 = new DiagonalCollection([[0,1],[0,3],[1,2],[4,7]])
    const d2 = new DiagonalCollection([[1,9],[0,3],[4,8],[3,9]])
    const d3 = new DiagonalCollection([[2,4],[0,1],[4,6],[0,4]])
    const d4 = new DiagonalCollection([[3,12],[4,7],[0,1]])
    const d5 = new DiagonalCollection([[0,1]])

    test('Union - precalculated', () => {
        expect(dc.union(d1,d2).equal(new DiagonalCollection([[0,1],[0,3],[1,2],[4,7],[1,9],[4,8],[3,9]]))).toEqual(true)
        expect(dc.union(d1,d2,d3).equal(new DiagonalCollection([[0,1],[0,3],[1,2],[4,7],[1,9],[4,8],[3,9],[2,4],[4,6],[0,4]]))).toEqual(true)
        expect(dc.union(d1,d2,d3,d4).equal(new DiagonalCollection([[0,1],[0,3],[1,2],[4,7],[1,9],[4,8],[3,9],[2,4],[4,6],[0,4],[3,12]]))).toEqual(true)
        expect(dc.union(d3,d4).equal(new DiagonalCollection([[0,1],[2,4],[4,6],[0,4],[3,12],[4,7],[0,1]]))).toEqual(true)
        expect(dc.union(d1,d4).equal(dc.union(d4,d1))).toEqual(true)
        expect(dc.union(d1,d2,d3).equal(dc.union(d3,d1,d2))).toEqual(true)
        expect(dc.union(d1,d2,d3).equal(new DiagonalCollection([[0,1],[4,11],[0,3],[1,2],[4,7],[1,9],[4,8],[3,9],[2,4],[4,6],[0,4]]))).toEqual(false)
        expect(dc.union(d3,d4).equal(new DiagonalCollection([[0,1],[2,4],[0,4],[3,12],[4,7],[0,1]]))).toEqual(false)
    });

    test('Intersection - precalculated', () => {
        expect(dc.intersect(d1,d2).equal(new DiagonalCollection([[0,3]]))).toEqual(true)
        expect(dc.intersect(d1,d2,d3).equal(new DiagonalCollection([]))).toEqual(true)
        expect(dc.intersect(d1,d2,d3).equal(new DiagonalCollection([[0,3]]))).toEqual(false)
        expect(dc.intersect(d1,d4).equal(new DiagonalCollection([[0,1],[4,7]]))).toEqual(true)
        expect(dc.intersect(d1,d3,d5).equal(new DiagonalCollection([[0,1]]))).toEqual(true)
        expect(dc.intersect(d1,d3,d5).equal(dc.intersect(d3,d5,d1))).toEqual(true)
        expect(dc.intersect(d1,d2,d3).equal(dc.intersect(d2,d1,d3))).toEqual(true)
    });

    test('Subtract - precalculated', () => {
        expect(dc.subtract(d1,d2).equal(new DiagonalCollection([[0,1],[1,2],[4,7]]))).toEqual(true)
        expect(dc.subtract(d1,d2).equal(dc.subtract(d1, dc.intersect(d1,d2)))).toEqual(true)
        expect(dc.subtract(d1,d2).equal(new DiagonalCollection([[0,1],[1,2],[4,7],[0,3]]))).toEqual(false)
        expect(dc.subtract(d2,d4).equal(d2)).toEqual(true)
        expect(dc.subtract(d3,d5).equal(new DiagonalCollection([[2,4],[4,6],[0,4]]))).toEqual(true)
        expect(dc.subtract(d3,d5).equal(new DiagonalCollection([[2,4],[0,1],[4,6],[0,4]]))).toEqual(false)
    });

    test('IsCrossing - precalculated', () => {
        expect(dc.isCrossing([0,3],[5,8])).toEqual(false)
        expect(dc.isCrossing([4,11],[5,8])).toEqual(false)
        expect(dc.isCrossing([4,11],[12,15])).toEqual(false)
        expect(dc.isCrossing([0,3],[12,15])).toEqual(false)
        expect(dc.isCrossing([0,12],[12,15])).toEqual(false)

        expect(dc.isCrossing([0,13],[12,15])).toEqual(true)
        expect(dc.isCrossing([4,9],[5, 17])).toEqual(true)
    });

    test('GetSharedEndpoints - precalculated', () => {
        expect(dc.getSharedEndpoint([0,3],[5,8])).toEqual(-1)
        expect(dc.getSharedEndpoint([0,3],[1,3])).toEqual(3)
        expect(dc.getSharedEndpoint([12,15],[12,30])).toEqual(12)
        expect(dc.getSharedEndpoint([2,3],[3,19])).toEqual(3)
    });


});