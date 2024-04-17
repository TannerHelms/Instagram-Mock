import { PrismaClient, User } from "@prisma/client";
import { JwtPayload } from "../../utils/jwt";
import { UploadedFile } from 'express-fileupload'; // Make sure this import is correct

declare global {
  namespace Express {
    interface Request {
      user?: User & { id: number }; // Adjust based on how your user object looks
      jwtPayload?: JwtPayload;
      files?: {
        [key: string]: UploadedFile | UploadedFile[];
      };
    }
  }
}
