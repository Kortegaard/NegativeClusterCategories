import * as ncc from '../src/NCC';
import * as diag from '../src/DiagonalCollectionFcts';
import {NegativeCCDiagonalCollection} from '../src/NegativeCCDiagonalCollection';

describe('Testing Negative Cluster Category Functions', () => {

  const sms1 = new NegativeCCDiagonalCollection([[1,3],[0,5],[7,9]], 2,3)
  const sms2 = new NegativeCCDiagonalCollection([[2,4],[0,5],[7,9]], 2,3)
  const sms3 = new NegativeCCDiagonalCollection([[0,3],[4,11], [5,8], [12,15]], 3,4)

  const sms3_extClose = new NegativeCCDiagonalCollection([[0,3],[4,11], [5,8], [12,15],[0,11],[0,15],[4,15],[8,15],[8,11]], 3,4)

  const nccColl2 = new NegativeCCDiagonalCollection([[1,3],[0,5],[0,7]], 2,3)

  test('Sigma - Precalculated', () => {
    expect(ncc.Sigma([1,2], 5)).toEqual([2,3]);
    expect(ncc.Sigma([1,2], 5, 2)).toEqual([3,4]);
    expect(ncc.Sigma([1,2], 5,-1)).toEqual([0,1]);
    expect(ncc.Sigma([3,4], 5)).toEqual([0,4]);
    expect(ncc.Sigma([3,4], 5,-1)).toEqual([2,3]);
    expect(ncc.Sigma([3,10], 13)).toEqual([4,11]);
    expect(ncc.Sigma([3,12], 13)).toEqual([0,4]);

    expect(ncc.Sigma(sms1, 1).equal(new NegativeCCDiagonalCollection([[2,4],[1,6],[0,8]], 2,3))).toEqual(true);
    expect(ncc.Sigma(sms1, 3).equal(new NegativeCCDiagonalCollection([[4,6],[3,8],[0,2]], 2,3))).toEqual(true);
  });

  test('Cyclic order - Precalculated', () => {
    expect(ncc.isNOrdered(1,4,2,7)).toEqual(false);
    expect(ncc.isNOrdered(1,4,6,7)).toEqual(true);
    expect(ncc.isNOrdered(2,4,1,7)).toEqual(true);
    expect(ncc.isNOrdered(1,2,4,7)).toEqual(true);
    expect(ncc.isNOrdered(8,3,2, 10)).toEqual(false);
  });

  test('homDim - Precalculated', () => {
    expect(ncc.homDim([0,3],[0,15],3,4)).toEqual(1);
    expect(ncc.homDim([0,7],[0,15],3,4)).toEqual(1);
    expect(ncc.homDim([0,7],[4,11],3,4)).toEqual(1);
    expect(ncc.homDim([0,7],[0,3],3,4)).toEqual(0);
    expect(ncc.homDim([6,9],[10,13],3,4)).toEqual(0);
    expect(ncc.homDim([6,9],[3,10],3,4)).toEqual(0);
  });

  test('isSMS - Precalculated', () => {
    expect(sms1.isSimpleMindedSystem()).toEqual(true);
    expect(sms2.isSimpleMindedSystem()).toEqual(true);
    expect(sms3.isSimpleMindedSystem()).toEqual(true);
    expect(nccColl2.isSimpleMindedSystem()).toEqual(false);
  });

  test('ext - Precalculated', () => {
    const e1 = ncc.ext([4,11],[0,3],3,18)
    expect(e1.length).toEqual(1);
    expect(e1[0][0]).toEqual(0);
    expect(e1[0][1]).toEqual(11);
  });

  test('Extension Clossure - Precalculated', () => {
    expect(ncc.extensionClose(sms3).equal(sms3_extClose)).toEqual(true);
  });

  test('isExtensionclossed - Precalculated', () => {
    expect(sms3_extClose.isExtensionClosed()).toEqual(true);
    expect(sms3.isExtensionClosed()).toEqual(false);
    expect(sms1.isExtensionClosed()).toEqual(false);
    expect(nccColl2.isExtensionClosed()).toEqual(false);
  });

  test('isWDiagonal - Precalculated', () => {
    expect(ncc.isWDiagonal([1,3],2)).toEqual(true);
    expect(ncc.isWDiagonal([0,5],2)).toEqual(true);
    expect(ncc.isWDiagonal([7,9],2)).toEqual(true);
    expect(ncc.isWDiagonal([0,3],3)).toEqual(true);
    expect(ncc.isWDiagonal([4,11],3)).toEqual(true);
    expect(ncc.isWDiagonal([3,11],3)).toEqual(false);
    expect(ncc.isWDiagonal([3,12],3)).toEqual(false);
    expect(ncc.isWDiagonal([4,12],3)).toEqual(false);
  });

  test('Extension Clossure - on Random SMS', () => {
    let w = 0;
    let e = 0;
    for (let i = 0; i < 10; i++) {
      w =  Math.floor(Math.random() * 25) + 1
      e =  Math.floor(Math.random() * 25) + 1
      const sms = ncc.randomSimpleMindedSystem(w,e);
      if(sms == null){ continue; }
      const extcls = ncc.extensionClose(sms)
      expect(extcls.isExtensionClosed()).toEqual(true);
    }
  });

  test('leftPerp - precalculated', () => {
    const c1 = ncc.leftPerp(new NegativeCCDiagonalCollection([[5,8],[12,15]], sms3.w, sms3.e), sms3_extClose)
    const c1_shouldbe = new NegativeCCDiagonalCollection([[0,3],[0,11],[4,11]], sms3.w, sms3.e)

    expect(c1.equal(c1_shouldbe)).toEqual(true)
  })

  test('rightPerp - precalculated', () => {
    const c1 = ncc.rightPerp(new NegativeCCDiagonalCollection([[5,8],[12,15]], sms3.w, sms3.e), sms3_extClose)
    const c1_shouldbe = new NegativeCCDiagonalCollection([[0,3],[0,11],[0,15],[4,11],[4,15],[8,11],[8,15]], sms3.w, sms3.e)

    expect(c1.equal(c1_shouldbe)).toEqual(true)
  })

});