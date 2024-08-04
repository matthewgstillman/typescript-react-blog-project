import { Request } from 'express';
import { IUserDocument } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}