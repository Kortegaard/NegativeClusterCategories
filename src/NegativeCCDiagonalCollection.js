"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.NegativeCCDiagonalCollection = void 0;
var DiagonalCollection_1 = require("./DiagonalCollection");
var DiagonalCollectionFcts_1 = require("./DiagonalCollectionFcts");
var NCC = require("./NCC");
var NegativeCCDiagonalCollection = /** @class */ (function (_super) {
    __extends(NegativeCCDiagonalCollection, _super);
    function NegativeCCDiagonalCollection(objs, w, e) {
        var _this = _super.call(this, objs) || this;
        _this.w = 0;
        _this.e = 0;
        _this.N = 0;
        _this.w = w;
        _this.e = e;
        _this.N = (w + 1) * (e + 1) - 2;
        return _this;
    }
    NegativeCCDiagonalCollection.prototype.clone = function (filter) {
        if (filter === void 0) { filter = function () { return true; }; }
        return new NegativeCCDiagonalCollection(__spreadArray([], this.diagonals, true).filter(filter), this.w, this.e);
    };
    NegativeCCDiagonalCollection.prototype.isSimpleMindedSystem = function () {
        for (var _i = 0; _i < this.diagonals.length; _i++) {
            if (this.diagonals[_i][1] <= this.diagonals[_i][0]) {
                return false;
            }
            if (NCC.isWDiagonal(this.diagonals[_i], this.w))
                for (var _j = _i + 1; _j < this.diagonals.length; _j++) {
                    if (this.diagonals[_i][0] == this.diagonals[_j][0] ||
                        this.diagonals[_i][1] == this.diagonals[_j][0] ||
                        this.diagonals[_i][1] == this.diagonals[_j][1] ||
                        this.diagonals[_i][0] == this.diagonals[_j][1]) {
                        return false;
                    }
                    if ((0, DiagonalCollectionFcts_1.isCrossing)(this.diagonals[_i], this.diagonals[_j])) {
                        return false;
                    }
                }
        }
        return true;
    };
    // TODO
    NegativeCCDiagonalCollection.prototype.isRigid = function () {
        return false;
    };
    // Could improve with a faster fail if not ext closed, by implementing ext clossure here
    NegativeCCDiagonalCollection.prototype.isExtensionClosed = function () {
        return this.equal(NCC.extensionClose(this));
    };
    return NegativeCCDiagonalCollection;
}(DiagonalCollection_1.DiagonalCollection));
exports.NegativeCCDiagonalCollection = NegativeCCDiagonalCollection;
