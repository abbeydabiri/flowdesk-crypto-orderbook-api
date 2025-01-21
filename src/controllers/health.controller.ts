import { Request, Response } from 'express';

export const getServiceHealth = async (req: Request, res: Response) => {
  res.send('ping');
}