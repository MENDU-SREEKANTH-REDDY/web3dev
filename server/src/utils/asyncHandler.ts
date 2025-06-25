import { Request, Response, NextFunction, RequestHandler } from "express";

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> // 👈 change from void to any
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
