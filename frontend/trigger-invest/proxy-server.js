import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization", "appkey", "appsecret"]
}));

app.use(express.json());

app.get("/api/stocks/symbol", async (req, res) => {
    try {
        const { stockCode } = req.query;
        if (!stockCode) {
            return res.status(400).json({ error: "stockCode is required" });
        }

        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/search-stock-info", {
            params: {
                PRDT_TYPE_CD: "300",
                PDNO: stockCode
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "CTPF1002R"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/current-price", async (req, res) => {
    try {
        const { stockCode } = req.query;
        if (!stockCode) {
            return res.status(400).json({ error: "stockCode is required" });
        }

        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_input_iscd: stockCode
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHKST01010100"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/news", async (req, res) => {
    try {
        const { stockCode } = req.query;
        if (!stockCode) {
            return res.status(400).json({ error: "stockCode is required" });
        }

        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/news-title", {
            params: {
                fid_news_ofer_entp_code: "",
                fid_cond_mrkt_cls_code: "",
                fid_input_iscd: stockCode,
                fid_titl_cntt: "",
                fid_input_date_1: "",
                fid_input_hour_1: "",
                fid_rank_sort_cls_code: "",
                fid_input_srno: ""
            },    
            
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHKST01011800"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/volume-rank", async (req, res) => {
    try {
        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/volume-rank", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_cond_scr_div_code: "20171",
                fid_input_iscd: "2001",
                fid_div_cls_code: "0",
                fid_blng_cls_code: "0",
                fid_trgt_cls_code: "11111111",
                fid_trgt_exls_cls_code: "000000",
                fid_input_price_1: "0",
                fid_input_price_2: "0",
                fid_vol_cnt: "0",
                fid_input_date_1: "0"
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHPST01710000"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/amount-rank", async (req, res) => {
    try {
        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/volume-rank", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_cond_scr_div_code: "20171",
                fid_input_iscd: "2001",
                fid_div_cls_code: "0",
                fid_blng_cls_code: "3",
                fid_trgt_cls_code: "11111111",
                fid_trgt_exls_cls_code: "000000",
                fid_input_price_1: "0",
                fid_input_price_2: "0",
                fid_vol_cnt: "0",
                fid_input_date_1: "0"
            },
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHPST01710000"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/fluctuation-up-rank", async (req, res) => {
    try {
        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/ranking/fluctuation", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_cond_scr_div_code: "20170",
                fid_input_iscd: "2001",
                fid_rank_sort_cls_code: "0",
                fid_input_cnt_1: "0",
                fid_prc_cls_code: "1",
                fid_input_price_1: "0",
                fid_input_price_2: "0",
                fid_vol_cnt: "0",
                fid_trgt_cls_code: "0",
                fid_trgt_exls_cls_code: "0",
                fid_div_cls_code: "0",
                fid_rsfl_rate1: "0",
                fid_rsfl_rate2: "0"
            },

            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHPST01700000"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/stocks/fluctuation-down-rank", async (req, res) => {
    try {
        const response = await axios.get("https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/ranking/fluctuation", {
            params: {
                fid_cond_mrkt_div_code: "J",
                fid_cond_scr_div_code: "20170",
                fid_input_iscd: "2001",
                fid_rank_sort_cls_code: "1",
                fid_input_cnt_1: "0",
                fid_prc_cls_code: "1",
                fid_input_price_1: "0",
                fid_input_price_2: "0",
                fid_vol_cnt: "0",
                fid_trgt_cls_code: "0",
                fid_trgt_exls_cls_code: "0",
                fid_div_cls_code: "0",
                fid_rsfl_rate1: "0",
                fid_rsfl_rate2: "0"
            },

            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                appkey: process.env.REACT_APP_APP_KEY,
                appsecret: process.env.REACT_APP_APP_SECRET_KEY,
                tr_id: "FHPST01700000"
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy Server running on http://localhost:${PORT}`);
});
