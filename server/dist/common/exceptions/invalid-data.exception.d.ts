import { HttpException } from '@nestjs/common';
export declare class InvalidDataException extends HttpException {
    constructor(details?: string);
}
