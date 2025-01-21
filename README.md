<h1 align='center'>
  Flowdesk Crypto Orderbook API
</h1>

## 📜 Table of Contents
- [Overview](#-overview)
- [Goals](###-goals)
- [Specifications](###-specifications)
- [Technology stack](##-technology-stack)
- [Added extras](##-added-extras)
- [Future improvements](##future-improvements)
- [How it works](##how-it-works)
- [Run locally](##run-locally)
- [Run Docker](##run-docker)


## OVERVIEW
As a market maker, having a global price index is essential.
To do that, we are using orderbook data provided by exchanges and computing them to have a fair mid-price (the average between best bid and best ask.)


### GOALS
Expose a REST API which gives us the global price index of the trading pair BTC/USDT, computed from 3 different exchanges :

1. Binance
2. Kraken
3. Huobi

### SPECIFICATIONS
Your mission, if you accept it, will be to fetch the BTC/USDT order book from the 3 exchanges written above; compute for each orderbook a mid-price and finally return an average of these mid-prices. You have to take into consideration that you may add new exchanges later.

### DOCUMENTATIONS
- Binance api documentation: 
  -https://developers.binance.com/docs/binance-spot-api-docs/web-socket-streams
- Kraken api documentation: 
  - https://docs.kraken.com/api/
- Huobi api documentation: 
  - https://www.htx.com/en-us/opend/newApiPages

## TECHNOLOGY STACK
- NodeJS
- TypeScript
- Express.JS

## ADDED EXTRAS
- Extended beyond BTC/USDT to any trading pair that exists, e.g LTC/USDT, ETH/USDT
- Included Mid Price from every exchange consulted in api response
- Included health endpoint for uptime monitoring
- Added Dockerfile for easier deployment 

## FUTURE IMPROVEMENTS
- Monitoring of rest API calls to avoid rate limiting
- Addition of more centralized exchanges and their apis
- Integration of decentralized exchanges / smartcontracts

## HOW IT WORKS
To use the application execute the following commands via curl, postman or a simple browser page.

1. Sample Response
```
{
  "price": 105982.38,
  "pair": "BTCUSDT",
  "exchanges": {
    "binance": 105999.535,
    "kraken": 105998.25,
    "huobi": 105949.355
  }
}
```

2. URL of application: 
```
http://localhost:3000/price/BTCUSDT
```

3. To use curl:
```
curl "http://localhost:3000/price/BTCUSDT"
```

4. To add and check price of a new tradingpair:
```
curl "http://localhost:3000/price/ETHUSDT"
```


## RUN LOCALLY
To run the project locally execute the following commands

1. Clone repo to your machine (use SSH) and change to flowdesk-crypto-orderbook-api directory
```
cd flowdesk-crypto-orderbook-api
```

2. Installing dependencies requires node v18.0.0 at least:
```
npm install
```

3. To run the tests using Jest:
```
npm run test
```

4. Run in development mode:
```
npm run dev
```

5. Build the application:
```
npm run build
```

6. Start the application
```
npm run start
```

## RUN DOCKER
To run the project via docker execute the following commands

1. Clone repo to your machine (use SSH) and change to flowdesk-crypto-orderbook-api directory
```
cd flowdesk-crypto-orderbook-api
```

2. Run docker build
```
docker build -t flowdesk-crypto-orderbook-api .
```

3. Run docker instance
```
docker run --name=fco-api -p 127.0.0.1:3000:3000 -d flowdesk-crypto-orderbook-api
```