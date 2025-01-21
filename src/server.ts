
import app from './app';
import { logger } from './utils/logger'
import { fetchOrderbook } from './services/orderbook.service';

// start fetching orderbooks
(async () => {
  await fetchOrderbook();
})();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
