import axios from "axios";
import WebSocket from 'ws';
import Depth from "./binance.interface";
import { logger } from '../../../utils/logger'
import Orderbook from '../../../models/orderbook.model'
import { unsetValue, setValue } from "../../../config/memorystore";
import { calculateAverage } from "../../../utils/calculator";

const config = {
  name: "binance",
  url: "wss://stream.binance.com:9443/stream",
  restapi: "https://api.binance.com/api/v3/exchangeInfo",
  depth: 5,
};

var ws: WebSocket;

export const closeBinanceWebsocket = () => {
  ws.close();
}

export const checkTradingPair = async (pair: string): Promise<boolean> => {
  let foundPair: boolean = false;
  try {
    const response = await axios.get(config.restapi, {
      params: {
        symbol: pair,
      },
    });

    if (response.status == 200) {
      foundPair = true;
    }
  } catch (error) { }
  return foundPair;
}

export const fetchOrderbookBinance = async (pairs: string[]): Promise<void> => {
  if (pairs.length == 0) {
    return;
  }

  let pairParam: string[] = [];
  for (let i = 0; i < pairs.length; i++) {
    if (await checkTradingPair(pairs[i])) {
      pairParam.push(`${pairs[i].toLowerCase()}@depth${config.depth}@1000ms`);
    }
  }

  try {
    if (ws !== undefined) {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: pairParam,
          id: 1,
        })
      );
    } else {
      ws = new WebSocket(config.url);
    }


    ws.on("open", () => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: pairParam,
          id: 1,
        })
      );
    });


    ws.on('ping', () => {
      ws.pong();
    });

    ws.on('error', async (err: any) => {
      logger.error('WebSocket error:', err);
    });

    ws.on("message", async (response: any) => {

      const data: Depth = JSON.parse(response);
      if (data.stream !== undefined && data.stream !== '') {
        const bestAsk = Math.min(...data.data.asks.map((ask) => ask[0]));
        const bestBid = Math.max(...data.data.bids.map((bid) => bid[0]));
        const midPrice = calculateAverage([bestAsk, bestBid]);

        const pair = data.stream.split('@')[0].toUpperCase()
        const pairExchange = `${config.name}-${pair}`

        await unsetValue(pairExchange)
        const pairExchangeOrderbook: Orderbook = {
          ask: bestAsk,
          bid: bestBid,
          mid: midPrice,
          pair: pair,
          exchange: config.name
        }
        await setValue(pairExchange, pairExchangeOrderbook)
      }
    });

  } catch (error) {
    logger.error(`fetchOrderbookBinance: ${error}`);
  }
};

