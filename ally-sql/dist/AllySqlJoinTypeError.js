"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AllySqlJoinTypeError = /** @class */ (function (_super) {
    __extends(AllySqlJoinTypeError, _super);
    function AllySqlJoinTypeError() {
        var _this = _super.call(this, 'Joins must always have a type') || this;
        _this.name = 'AllySqlJoinTypeError';
        return _this;
    }
    return AllySqlJoinTypeError;
}(Error));
exports.default = AllySqlJoinTypeError;
