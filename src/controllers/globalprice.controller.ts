import { Request, Response } from 'express';
import { logger } from '../utils/logger'
import PriceInterface from '../services/price.interface';
import { getGlobalPriceIndex, addTradingPair, tradingpairExists } from '../services/orderbook.service';

export const getGlobalPrice = async (req: Request, res: Response) => {
  try {
    const { pair } = req.params;
    const exists = await tradingpairExists(pair);
    if (!exists) {
      await addTradingPair(pair); // Add trading pair if it doesn't exist
      await new Promise(resolve => setTimeout(resolve, 1000));
    }


    let response: PriceInterface = { pair: '', price: 0, exchanges: {} }; // Initialize with default values
    await getGlobalPriceIndex(pair).then((price: PriceInterface) => {
      response = price;
    });

    if (response.price <= 0) {
      res.status(400).json({ 'error': 'Price not found for pair ' + pair });
      return;
    }

    res.status(200).json(response);
  } catch (error) {
    logger.error(error);
    res.status(500).send('Internal Server Error');
  }
}