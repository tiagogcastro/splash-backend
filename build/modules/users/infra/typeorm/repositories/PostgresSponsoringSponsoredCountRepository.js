"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _SponsoringSponsoredCount = _interopRequireDefault(require("../entities/SponsoringSponsoredCount"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresSponsoringSponsoredCountRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_SponsoringSponsoredCount.default);
  }

  async updateCount(user_id, data) {
    const count = await this.ormRepository.update(user_id, data);

    if (count.affected === 1) {
      const countUpdated = await this.ormRepository.findOne(user_id);
      return countUpdated;
    }

    return undefined;
  }

}

exports.default = PostgresSponsoringSponsoredCountRepository;