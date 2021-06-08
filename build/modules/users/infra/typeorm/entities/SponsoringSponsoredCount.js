"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _User = _interopRequireDefault(require("./User"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let SponsoringSponsoredCount = (_dec = (0, _typeorm.Entity)('user_sponsorsing_sponsored'), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec4 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.ManyToOne)(() => _User.default), _dec7 = (0, _typeorm.JoinColumn)({
  name: 'user_id'
}), _dec8 = Reflect.metadata("design:type", typeof _User.default === "undefined" ? Object : _User.default), _dec9 = (0, _typeorm.Column)(), _dec10 = Reflect.metadata("design:type", Number), _dec11 = (0, _typeorm.Column)(), _dec12 = Reflect.metadata("design:type", Number), _dec13 = (0, _typeorm.CreateDateColumn)(), _dec14 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec15 = (0, _typeorm.UpdateDateColumn)(), _dec16 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class SponsoringSponsoredCount {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    this.user_id = void 0;

    _initializerDefineProperty(this, "user", _descriptor2, this);

    _initializerDefineProperty(this, "sponsoring_count", _descriptor3, this);

    _initializerDefineProperty(this, "sponsored_count", _descriptor4, this);

    _initializerDefineProperty(this, "created_at", _descriptor5, this);

    _initializerDefineProperty(this, "updated_at", _descriptor6, this);

    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec6, _dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sponsoring_count", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sponsored_count", [_dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec15, _dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class) || _class) || _class);
var _default = SponsoringSponsoredCount;
exports.default = _default;