import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

const BASEURL = 'http://localhost:3000/api/';

// stockDetail/Chart.jsx
function fakeStockData() {
  const data = [
    { historyDate: '2025-01-31', tickerId: '005930', openPrice: 52200, closedPrice: 52400, highPrice: 53000, lowPrice: 51700, volume: 42186280 },
    { historyDate: '2025-01-24', tickerId: '005930', openPrice: 53600, closedPrice: 53700, highPrice: 53800, lowPrice: 53200, volume: 11867631 },
    { historyDate: '2025-01-23', tickerId: '005930', openPrice: 53700, closedPrice: 53700, highPrice: 54100, lowPrice: 53500, volume: 15588067 },
    { historyDate: '2025-01-22', tickerId: '005930', openPrice: 53400, closedPrice: 54300, highPrice: 54400, lowPrice: 53100, volume: 18341992 },
    { historyDate: '2025-01-21', tickerId: '005930', openPrice: 53700, closedPrice: 53500, highPrice: 54300, lowPrice: 53300, volume: 13535702 },
    { historyDate: '2025-01-20', tickerId: '005930', openPrice: 53600, closedPrice: 53400, highPrice: 53900, lowPrice: 53300, volume: 11822531 },
    { historyDate: '2025-01-17', tickerId: '005930', openPrice: 53800, closedPrice: 53700, highPrice: 54100, lowPrice: 53200, volume: 18805344 },
    { historyDate: '2025-01-16', tickerId: '005930', openPrice: 54200, closedPrice: 54300, highPrice: 55000, lowPrice: 54100, volume: 18627298 },
    { historyDate: '2025-01-15', tickerId: '005930', openPrice: 54100, closedPrice: 53700, highPrice: 54700, lowPrice: 53500, volume: 18625024 },
    { historyDate: '2025-01-14', tickerId: '005930', openPrice: 54200, closedPrice: 53900, highPrice: 54600, lowPrice: 53700, volume: 17465926 },
    { historyDate: '2025-01-13', tickerId: '005930', openPrice: 54600, closedPrice: 54100, highPrice: 55000, lowPrice: 54100, volume: 16868600 },
    { historyDate: '2025-01-10', tickerId: '005930', openPrice: 56100, closedPrice: 55300, highPrice: 56500, lowPrice: 55200, volume: 16059223 },
    { historyDate: '2025-01-09', tickerId: '005930', openPrice: 57600, closedPrice: 56100, highPrice: 57700, lowPrice: 56100, volume: 24490592 },
    { historyDate: '2025-01-08', tickerId: '005930', openPrice: 54800, closedPrice: 57300, highPrice: 57500, lowPrice: 54700, volume: 26593552 },
    { historyDate: '2025-01-07', tickerId: '005930', openPrice: 56800, closedPrice: 55400, highPrice: 57300, lowPrice: 55400, volume: 17030236 },
    { historyDate: '2025-01-06', tickerId: '005930', openPrice: 54400, closedPrice: 55900, highPrice: 56200, lowPrice: 54300, volume: 19034284 },
    { historyDate: '2025-01-03', tickerId: '005930', openPrice: 52800, closedPrice: 54400, highPrice: 55100, lowPrice: 52800, volume: 19318046 },
    { historyDate: '2025-01-02', tickerId: '005930', openPrice: 52700, closedPrice: 53400, highPrice: 53600, lowPrice: 52300, volume: 16630538 }
  ];
  return data.reverse();
}

mock.onGet(BASEURL + 'stocks/price').reply(200, fakeStockData());


// stockDetail/Info.jsx
function fakeInfoData() {
  return {
    tickerId: "000660",
    listingDate: "1996-12-26",
    totalProfit: 214625,
    netProfit: 117904.00,
    netProfitRate: 25.40,
  }
}

mock.onGet(BASEURL + 'stocks/info').reply(200, fakeInfoData());
