import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`Method : ${req.method} - Route : ${req.path}`);
    next();
};

const handlerResponse = (res, codeError, output, validate = true): void => {
    const responseObject = {
        response: {
            systemMessage: output.message,
            requestValidate: validate,
            statusCode: codeError,
        },
    };

    return res.status(codeError).send(responseObject);
};

export { loggerMiddleware, handlerResponse };
