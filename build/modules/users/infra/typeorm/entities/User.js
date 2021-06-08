"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _classTransformer = require("class-transformer");

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Permissions;

(function (Permissions) {
  Permissions["user"] = "user";
  Permissions["shop"] = "shop";
  Permissions["admin"] = "admin";
})(Permissions || (Permissions = {}));

let User = (_dec = (0, _typeorm.Entity)('users'), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec4 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  nullable: true
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.Column)({
  unique: true
}), _dec9 = Reflect.metadata("design:type", String), _dec10 = (0, _classTransformer.Exclude)(), _dec11 = (0, _typeorm.Column)({
  unique: true,
  nullable: true
}), _dec12 = Reflect.metadata("design:type", String), _dec13 = (0, _typeorm.Column)({
  nullable: true
}), _dec14 = Reflect.metadata("design:type", String), _dec15 = (0, _classTransformer.Exclude)(), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _classTransformer.Exclude)(), _dec19 = (0, _typeorm.Column)({
  unique: true,
  nullable: true
}), _dec20 = Reflect.metadata("design:type", String), _dec21 = (0, _typeorm.Column)({
  type: 'enum',
  enum: Permissions,
  nullable: true
}), _dec22 = Reflect.metadata("design:type", typeof Permissions === "undefined" ? Object : Permissions), _dec23 = (0, _typeorm.Column)({
  default: true
}), _dec24 = Reflect.metadata("design:type", Boolean), _dec25 = (0, _typeorm.CreateDateColumn)(), _dec26 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec27 = (0, _typeorm.UpdateDateColumn)(), _dec28 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec29 = (0, _classTransformer.Expose)({
  name: 'avatar_url'
}), _dec30 = Reflect.metadata("design:type", Function), _dec31 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = class User {
  getAvatarUrl() {
    if (!this.avatar) return null;

    switch (_upload.default.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/static/${this.avatar}`;

      case 's3':
        return `https://${_upload.default.config.aws.bucket}.s3-${_upload.default.config.aws.region}.amazonaws.com/${this.avatar}`;

      default:
        return null;
    }
  }

  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "username", _descriptor3, this);

    _initializerDefineProperty(this, "email", _descriptor4, this);

    _initializerDefineProperty(this, "avatar", _descriptor5, this);

    _initializerDefineProperty(this, "password", _descriptor6, this);

    _initializerDefineProperty(this, "phone_number", _descriptor7, this);

    _initializerDefineProperty(this, "roles", _descriptor8, this);

    _initializerDefineProperty(this, "activated_account", _descriptor9, this);

    _initializerDefineProperty(this, "created_at", _descriptor10, this);

    _initializerDefineProperty(this, "updated_at", _descriptor11, this);

    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "username", [_dec8, _dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "email", [_dec10, _dec11, _dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "password", [_dec15, _dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "phone_number", [_dec18, _dec19, _dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "roles", [_dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "activated_account", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "getAvatarUrl", [_dec29, _dec30, _dec31], Object.getOwnPropertyDescriptor(_class2.prototype, "getAvatarUrl"), _class2.prototype)), _class2)) || _class) || _class) || _class);
var _default = User;
exports.default = _default;