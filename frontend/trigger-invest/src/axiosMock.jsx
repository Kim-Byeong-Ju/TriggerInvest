import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

const mock = new AxiosMockAdapter(axios);

const BASEURL = 'http://localhost:3000/api/';

// stockDetail/Chart.jsx
function fakeStockData() {
    const data = [
        { date: '2025-01-31', ticker_id: '005930', open_price: 52200, closed_price: 52400, high_price: 53000, low_price: 51700, volume: 42186280 },
        { date: '2025-01-24', ticker_id: '005930', open_price: 53600, closed_price: 53700, high_price: 53800, low_price: 53200, volume: 11867631 },
        { date: '2025-01-23', ticker_id: '005930', open_price: 53700, closed_price: 53700, high_price: 54100, low_price: 53500, volume: 15588067 },
        { date: '2025-01-22', ticker_id: '005930', open_price: 53400, closed_price: 54300, high_price: 54400, low_price: 53100, volume: 18341992 },
        { date: '2025-01-21', ticker_id: '005930', open_price: 53700, closed_price: 53500, high_price: 54300, low_price: 53300, volume: 13535702 },
        { date: '2025-01-20', ticker_id: '005930', open_price: 53600, closed_price: 53400, high_price: 53900, low_price: 53300, volume: 11822531 },
        { date: '2025-01-17', ticker_id: '005930', open_price: 53800, closed_price: 53700, high_price: 54100, low_price: 53200, volume: 18805344 },
        { date: '2025-01-16', ticker_id: '005930', open_price: 54200, closed_price: 54300, high_price: 55000, low_price: 54100, volume: 18627298 },
        { date: '2025-01-15', ticker_id: '005930', open_price: 54100, closed_price: 53700, high_price: 54700, low_price: 53500, volume: 18625024 },
        { date: '2025-01-14', ticker_id: '005930', open_price: 54200, closed_price: 53900, high_price: 54600, low_price: 53700, volume: 17465926 },
        { date: '2025-01-13', ticker_id: '005930', open_price: 54600, closed_price: 54100, high_price: 55000, low_price: 54100, volume: 16868600 },
        { date: '2025-01-10', ticker_id: '005930', open_price: 56100, closed_price: 55300, high_price: 56500, low_price: 55200, volume: 16059223 },
        { date: '2025-01-09', ticker_id: '005930', open_price: 57600, closed_price: 56100, high_price: 57700, low_price: 56100, volume: 24490592 },
        { date: '2025-01-08', ticker_id: '005930', open_price: 54800, closed_price: 57300, high_price: 57500, low_price: 54700, volume: 26593552 },
        { date: '2025-01-07', ticker_id: '005930', open_price: 56800, closed_price: 55400, high_price: 57300, low_price: 55400, volume: 17030236 },
        { date: '2025-01-06', ticker_id: '005930', open_price: 54400, closed_price: 55900, high_price: 56200, low_price: 54300, volume: 19034284 },
        { date: '2025-01-03', ticker_id: '005930', open_price: 52800, closed_price: 54400, high_price: 55100, low_price: 52800, volume: 19318046 },
        { date: '2025-01-02', ticker_id: '005930', open_price: 52700, closed_price: 53400, high_price: 53600, low_price: 52300, volume: 16630538 }
      ];
      return data.reverse();     
}

mock.onGet(BASEURL + 'stocks/stock-price/').reply(200, fakeStockData());
