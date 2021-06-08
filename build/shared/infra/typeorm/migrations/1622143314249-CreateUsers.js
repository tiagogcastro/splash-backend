"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUsers1622143314249 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'bio',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'phone_number',
        type: 'varchar',
        isUnique: true,
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: true
      }, {
        name: 'password',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'roles',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'activated_account',
        type: 'boolean',
        default: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('users');
  }

}

exports.default = CreateUsers1622143314249;