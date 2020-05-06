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
var AllySqlModelPrimaryKeyError = /** @class */ (function (_super) {
    __extends(AllySqlModelPrimaryKeyError, _super);
    function AllySqlModelPrimaryKeyError() {
        var _this = _super.call(this, 'A model should have at least 1 primary key field') || this;
        _this.name = 'AllySqlModelPrimaryKeyError';
        return _this;
    }
    return AllySqlModelPrimaryKeyError;
}(Error));
exports.default = AllySqlModelPrimaryKeyError;
