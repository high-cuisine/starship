import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
export declare class AllHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
