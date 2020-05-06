'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var pluralize_1 = __importDefault(require('pluralize'));
var Database_1 = __importDefault(require('./Database'));
var AllySqlModelPrimaryKeyError_1 = __importDefault(require('./AllySqlModelPrimaryKeyError'));
var Model = /** @class */ (function () {
  function Model() {}
  Model.init = function (db, tableName, tableSchema) {
    this.db = db;
    this.tableName = tableName;
    this.tableSchema = tableSchema;
    var keys = Object.keys(tableSchema);
    var values = Object.values(tableSchema);
    this.fields = keys;
    this.primaryFields = keys.filter(function (k, i) {
      return values[i].primary || false;
    });
    this.requiredFields = keys.filter(function (k, i) {
      return values[i].required || false;
    });
    this.returnFields = keys.filter(function (k, i) {
      return values[i].returning || true;
    });
    if (this.primaryFields.length < 1) {
      throw new AllySqlModelPrimaryKeyError_1.default();
    }
  };
  Model.find = function (query) {
    return __awaiter(this, void 0, void 0, function () {
      var _a,
        attrs,
        _b,
        limit,
        _c,
        offset,
        where,
        _d,
        join,
        formattedWhere,
        getSelect,
        getWhere,
        getGroupBy,
        getLimit,
        getOffset,
        sql;
      var _this = this;
      return __generator(this, function (_e) {
        (_a = query.attrs),
          (attrs = _a === void 0 ? this.returnFields : _a),
          (_b = query.limit),
          (limit = _b === void 0 ? null : _b),
          (_c = query.offset),
          (offset = _c === void 0 ? 0 : _c),
          (where = query.where),
          (_d = query.join),
          (join = _d === void 0 ? [] : _d);
        formattedWhere = Object.entries(where);
        getSelect = attrs.map(function (a) {
          return ' ' + _this.tableName + '.' + a + ' ';
        });
        getWhere = formattedWhere
          ? 'WHERE ' +
            formattedWhere.map(function (w) {
              return '\n' + _this.tableName + '.' + w[0] + ' = ' + Database_1.default.escape(w[1]);
            })
          : '';
        getGroupBy = join.length ? ' GROUP BY ' + this.tableName + '.' + this.primaryFields[0] + ' ' : '';
        getLimit = limit ? ' LIMIT ' + limit + ' ' : '';
        getOffset = offset ? ' OFFSET ' + offset + ' ' : '';
        sql =
          '\n      SELECT ' +
          getSelect +
          '\n      ,' +
          Model.getJoins(join, this).fields() +
          '\n      FROM ' +
          this.tableName +
          '\n      ' +
          Model.getJoins(join, this).joins() +
          '\n      ' +
          getWhere +
          '\n      ' +
          getGroupBy +
          '\n      ' +
          getLimit +
          '\n      ' +
          getOffset +
          '\n    ';
        this.db.query(sql, []);
        return [2 /*return*/, {}];
      });
    });
  };
  Model.getJoins = function (join, upperModel) {
    var _this = this;
    return {
      fields: function () {
        return join.map(function (j) {
          var attrs = j.attrs || j.model.returnFields;
          var getJoinName = j.as || pluralize_1.default(j.model.tableName);
          var getAttrs = attrs.map(function (attr) {
            return " '" + attr + "', " + j.model.tableName + '.' + attr + ', ';
          });
          var getObjectFields = j.attrs.map(function (attr) {
            return " '" + attr + "', " + j.model.tableName + '.' + attr + ' ';
          });
          var getInnerJoins = j.join.map(function (iJ) {
            return (
              " '" +
              (iJ.as || pluralize_1.default(iJ.model.tableName)) +
              "', " +
              Model.getJoins(j.join, j.model).fields() +
              ' '
            );
          });
          switch (j.type) {
            case 'many':
              return (
                '\n                IF(\n                  ' +
                j.model.tableName +
                '.' +
                j.model.primaryFields[0] +
                ' IS NULL,\n                  JSON_ARRAY(),\n                  JSON_ARRAYAGG(\n                    JSON_OBJECT(\n                      ' +
                getAttrs +
                '\n                      ' +
                getInnerJoins +
                '\n                    )\n                  )\n                  ) AS ' +
                getJoinName +
                ',\n                )\n              '
              );
            case 'single':
              return (
                '\n                JSON_OBJECT(\n                  ' +
                getObjectFields +
                '\n                ) AS ' +
                getJoinName +
                ',\n              '
              );
            default:
              throw new Error('Joins must always have a type');
          }
        });
      },
      joins: function () {
        if (join) {
          return join.map(function (j) {
            var getOn = j.on
              ? 'ON ' +
                Object.entries(j.on).map(function (w) {
                  return '\n' + j.model.tableName + '.' + w[0] + ' = ' + upperModel.tableName + '.' + w[1];
                })
              : '';
            var getInnerJoins = j.join ? _this.getJoins(j.join, j.model).joins() : '';
            return (
              '\n              LEFT JOIN\n                ' +
              j.model.tableName +
              ' \n                  ' +
              getOn +
              '\n                ' +
              getInnerJoins +
              '\n            '
            );
          });
        }
        return '';
      },
    };
  };
  return Model;
})();
exports.default = Model;
