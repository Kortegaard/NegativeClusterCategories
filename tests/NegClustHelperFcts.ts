import * as nch from '../src/NegClustHelperFcts';

describe('Testing Negative Cluster Category Functions', () => {

  test('Sigma', () => {
    expect(nch.Sigma([1,2], 5)).toEqual([2,3]);
    expect(nch.Sigma([1,2], 5, 2)).toEqual([3,4]);
    expect(nch.Sigma([1,2], 5,-1)).toEqual([0,1]);
    expect(nch.Sigma([3,4], 5)).toEqual([0,4]);
    expect(nch.Sigma([3,4], 5,-1)).toEqual([2,3]);
    expect(nch.Sigma([3,10], 13)).toEqual([4,11]);
    expect(nch.Sigma([3,12], 13)).toEqual([0,4]);
  });

  test('N Cyclic dist', () => {
    expect(nch.Ndist(3,4,13)).toEqual(1);
    expect(nch.Ndist(3,3,13)).toEqual(0);
    expect(nch.Ndist(10,10,13)).toEqual(0);
    expect(nch.Ndist(10,1,13)).toEqual(4);
  });
  
  test("N Cyclic Ordered", () => {
    expect(nch.isNOrdered(0,2,8, 10)).toEqual(true);
    expect(nch.isNOrdered(5,9,2, 10)).toEqual(true);
    expect(nch.isNOrdered(9,0,6, 10)).toEqual(true);
    expect(nch.isNOrdered(6,9,3, 10)).toEqual(true);
    expect(nch.isNOrdered(6,9,7, 10)).toEqual(false);
    expect(nch.isNOrdered(8,3,1, 10)).toEqual(false);
    expect(nch.isNOrdered(8,3,1, 14)).toEqual(false);
    expect(nch.isNOrdered(7,4,13, 14)).toEqual(false);
  })
  
  test('Homomorphism Dimensions', () => {
    expect(nch.homDim([0,8], [6,8], 2, 3)).toEqual(1);
    expect(nch.homDim([1,6], [4,9], 2, 3)).toEqual(1);
    expect(nch.homDim([4,9], [1,6], 2, 3)).toEqual(0);
    expect(nch.homDim([1,9], [1,3], 2, 3)).toEqual(0);
    expect(nch.homDim([2,4], [1,3], 2, 3)).toEqual(0);
    expect(nch.homDim([0,8], [1,9], 2, 3)).toEqual(0);
    expect(nch.homDim([0,8], [6,8], 2, 3)).toEqual(1);
  })

  test('Is Crossing', () => {
    expect(nch.isCrossing([0,8], [3,9])).toEqual(true);
    expect(nch.isCrossing([1,6], [0,5])).toEqual(true);
    expect(nch.isCrossing([0,6], [3,8])).toEqual(true);
    expect(nch.isCrossing([7,9], [2,9])).toEqual(false);
    expect(nch.isCrossing([7,9], [2,4])).toEqual(false);
    expect(nch.isCrossing([0,5], [1,4])).toEqual(false);
  })

  test('Is w Diagonal', () => {
    expect(nch.isWDiagonal([7,9],2)).toEqual(true);
    expect(nch.isWDiagonal([3,5],2)).toEqual(true);
    expect(nch.isWDiagonal([1,6],2)).toEqual(true);
    expect(nch.isWDiagonal([1,5],4)).toEqual(true);
    expect(nch.isWDiagonal([1,5],3)).toEqual(false);
    expect(nch.isWDiagonal([1,7],3)).toEqual(false);
    expect(nch.isWDiagonal([1,6],2)).toEqual(true);
    expect(nch.isWDiagonal([1,6],3)).toEqual(false);
  })

});