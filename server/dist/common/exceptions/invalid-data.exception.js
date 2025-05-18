"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDataException = void 0;
const common_1 = require("@nestjs/common");
class InvalidDataException extends common_1.HttpException {
    constructor(details) {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            error: 'InvalidData',
            message: details || 'Переданы некорректные данные',
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.InvalidDataException = InvalidDataException;
//# sourceMappingURL=invalid-data.exception.js.map