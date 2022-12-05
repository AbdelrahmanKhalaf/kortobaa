import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./auth";
export const checkRole =
  (...roles: Array<any>) =>
  (req: Request, res: Response, next: NextFunction) => {  
    console.log((req as AuthenticatedRequest).user!.role);
    
    if (!roles.includes((req as AuthenticatedRequest).user!.role)) {
     res.status(403).send({message_en:"Access Forbidden!! " , message_ar:"الوصول ممنوع !!"});
    }
 return   next();
  };
